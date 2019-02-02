using System;
using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace GoldStarApi.Controllers
{
    [Route("api/course")]
    public class CourseController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        private List<Course> coursesByDept;
        
        public CourseController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllCourses()
        {
            try
            {
                var courses = _repository.Course.GetAllCourses();
 
                _logger.LogInfo($"Returned all courses from database. "+Enumerable.Count(courses));
                
 
                return Ok(courses);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllCourses action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("{id}", Name ="CourseById")]
        public IActionResult GetCourseById(string id)
        {
            
            try
            {
                var course = _repository.Course.GetCourseById(id);
 
                if (course.Equals(null))
                {
                    _logger.LogError($"Course with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Course with id: {id}");
                    return Ok(course);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetCourseById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("department/{id}", Name ="CoursesByDepartmentId")]
        public IActionResult GetCoursesByDepartmentId(int id)
        {
            
            try
            {
                var courses = _repository.Course.GetAllCourses();
 
                if (courses.Equals(null))
                {
                    _logger.LogError($"No courses found in DB");
                    return NotFound();
                }

                coursesByDept = new List<Course>();
                foreach (var course in courses)
                {
                    if (course.Dept_Id == id)
                    {
                        coursesByDept.Add(course);
                    }
                }
                
                    _logger.LogInfo($"Returned Course with id: {id}");
                    return Ok(coursesByDept);
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetCourseById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateCourse([FromBody]Course course)
        {
            try
            {
                if(course.Equals(null))
                {
                    _logger.LogError("Course object sent from client is null.");
                    return BadRequest("course object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Course object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                _logger.LogError("Look Here"+course.Course_Id);
                
                _repository.Course.CreateCourse(course);

                return Ok(course);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateCourse action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateCourse(string id, [FromBody]Course course)
        {
            try
            {
                if (course.Equals(null))
                {
                    _logger.LogError("Course object sent from client is null.");
                    return BadRequest("Course object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Course object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbCourse = _repository.Course.GetCourseById(id);
                if (dbCourse.Equals(null))
                {
                    _logger.LogError($"Course with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Course.UpdateCourse(dbCourse, course);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateCourse action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(string id)
        {
            try
            {
                var course = _repository.Course.GetCourseById(id);
                if(course.Equals(null))
                {
                    _logger.LogError($"Course with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Course.DeleteCourse(course);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteCourse action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}