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
    [Route("api/student")]
    public class StudentController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public StudentController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllStudents()
        {
            try
            {
                var students = _repository.Student.GetAllStudents();
 
                _logger.LogInfo($"Returned all students from database. "+Enumerable.Count(students));
                
 
                return Ok(students);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllStudents action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
      
        
        [HttpGet("{id}", Name ="StudentById")]
        public IActionResult GetStudentById(int id)
        {
            
            try
            {
                var student = _repository.Student.GetStudentById(id);
 
                if (student.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Student with id: {id}");
                    return Ok(student);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetStudentById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
       
      

        [HttpPost]
        public IActionResult CreateStudent([FromBody]Student student)
        {
            try
            {
                if(student.Equals(null))
                {
                    _logger.LogError("Student object sent from client is null.");
                    return BadRequest("Student object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Student object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                _logger.LogError("Look Here"+student.Student_Id);
                
                _repository.Student.CreateStudent(student);

                return Ok(student);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateOwner action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, [FromBody]Student student)
        {
            try
            {
                if (student.Equals(null))
                {
                    _logger.LogError("Student object sent from client is null.");
                    return BadRequest("Student object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Student object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbStudent = _repository.Student.GetStudentById(id);
                if (dbStudent.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Student.UpdateStudent(dbStudent, student);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateStudent action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            try
            {
                var student = _repository.Student.GetStudentById(id);
                if(student.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Student.DeleteStudent(student);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteFaculty action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}