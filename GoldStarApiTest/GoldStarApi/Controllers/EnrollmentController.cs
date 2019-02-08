using System;
using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Internal;

namespace GoldStarApi.Controllers
{
    [Route("api/enrollment")]
    public class EnrollmentController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private List<CourseInformation> allCourseInfo;
        private List<Enrollment> enrollmentsBySection;
        
        public EnrollmentController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllEnrollments()
        {
            try
            {
                var enrollments = _repository.Enrollment.GetAllEnrollments();
 
                _logger.LogInfo($"Returned all Enrollments from database. "+Enumerable.Count(enrollments));
                
 
                return Ok(enrollments);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllEnrollments action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("{id}", Name ="EnrollmentById")]
        public IActionResult GetEnrollmentById(int id)
        {
            
            try
            {
             
                var enrollment = _repository.Enrollment.GetEnrollmentById(id);
 
                if (enrollment.Equals(null))
                {
                    _logger.LogError($"Enrollment with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Enrollment with id: {id}");
                    return Ok(enrollment);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEnrollment ById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("student/{id}", Name ="EnrollmentByStudentId")]
        public IActionResult GetEnrollmentByStudentId(int id)
        {
            
            try
            {
                _logger.LogInfo($"Look Enrollment with id: {id}");   
                var enrollments = _repository.Enrollment.GetEnrollmentsByStudentId(id);
                allCourseInfo = new List<CourseInformation>();
                
                foreach (Enrollment current in enrollments)
                {
                    CourseInformation currentCourse = new CourseInformation();
                    
                    var sectionId = current.Section_Id;
                    var currentSectionInfo = _repository.Section.GetSectionById(sectionId);
                    
                    currentCourse.Course_Id = currentSectionInfo.Course_Id;
                    currentCourse.Semester = currentSectionInfo.Semester;
                    currentCourse.Designation = currentSectionInfo.Designation;
                    currentCourse.Faculty_Id = currentSectionInfo.Faculty_Id;
                    currentCourse.Section_Id = currentSectionInfo.Section_Id;
                    currentCourse.End_Date = currentSectionInfo.End_Date;
                    currentCourse.Start_Date = currentSectionInfo.Start_Date;
                    currentCourse.Vacancy= currentSectionInfo.Vacancy;
                    
                    var currentCourseInfo = _repository.Course.GetCourseById(currentCourse.Course_Id);

                    currentCourse.Course_Name = currentCourseInfo.Course_Name;
                    currentCourse.Dept_Id = currentCourseInfo.Dept_Id;
                    currentCourse.Credits = currentCourseInfo.Credits;
                    
                    allCourseInfo.Add(currentCourse);
                    
                }
 
                if (enrollments.Equals(null))
                {
                    _logger.LogError($"Enrollment with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Enrollment with id: {id}");
                    return Ok(allCourseInfo);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEnrollment ById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        
        
        [HttpGet("section/{id}", Name ="EnrollmentBySectionId")]
        public IActionResult GetEnrollmentBySectionId(int id)
        {
            
            try
            {
                
                var enrollments = _repository.Enrollment.GetAllEnrollments();
                enrollmentsBySection = new List<Enrollment>();
               
 
                if (enrollments.Equals(null))
                {
                    _logger.LogError($"Enrollment with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                
                foreach (var current in enrollments)
                {
                    if (current.Section_Id == id)
                    {
                        enrollmentsBySection.Add(current);
                    }

                }
                    _logger.LogInfo($"Returned Enrollment with id: {id}");
                    return Ok(enrollmentsBySection);
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEnrollment ById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("section/student/{studentId}/{sectionId}", Name ="EnrollmentBySectionStudentId")]
        public IActionResult GetEnrollmentBySectionStudentId(int studentId, int sectionId)
        {
            
            try
            {
                
                var enrollments = _repository.Enrollment.GetAllEnrollments();
                var enrollment = new Enrollment();
               
                if (enrollments.Equals(null))
                {
                    _logger.LogError($"Enrollment with id: {studentId}, hasn't been found in db.");
                    return NotFound();
                }
                
                foreach (var current in enrollments)
                {
                    _logger.LogInfo($" Look Here"+ current);
                    
                    if (current.Section_Id == sectionId && current.Student_Id == studentId)
                    {
                        _logger.LogInfo($"Found enrollment "+ current);
                        return Ok(current);
                    }

                }
                _logger.LogInfo($"Could not find enrollment: {studentId}");
                return NotFound();
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEnrollment ById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpPost]
        public IActionResult CreateEnrollment([FromBody]Enrollment enrollment)
        {
            double costPerCourse = 4000;
            try
            {
                if(enrollment.Equals(null))
                {
                    _logger.LogError("Enrollment object sent from client is null.");
                    return BadRequest("Enrollment object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Enrollment object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                _repository.Enrollment.CreateEnrollment(enrollment);
                var student = _repository.Student.GetStudentById(enrollment.Student_Id);
                student.Amount_Owing += costPerCourse;

                return Ok(enrollment);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateEnrollment action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateEnrollment(int id, [FromBody]Enrollment enrollment)
        {
            try
            {
                if (enrollment.Equals(null))
                {
                    _logger.LogError("Enrollment object sent from client is null.");
                    return BadRequest("Enrollment object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Enrollment object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbEnrollment = _repository.Enrollment.GetEnrollmentById(id);
                if (dbEnrollment.Equals(null))
                {
                    _logger.LogError($"Enrollment with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Enrollment.UpdateEnrollment(dbEnrollment, enrollment);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateEnrollment action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteEnrollment(int id)
        {
            try
            {
                var enrollment = _repository.Enrollment.GetEnrollmentById(id);
                if(enrollment.Equals(null))
                {
                    _logger.LogError($"Enrollment with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Enrollment.DeleteEnrollment(enrollment);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteEnrollment action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}