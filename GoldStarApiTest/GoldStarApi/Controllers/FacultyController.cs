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
    [Route("api/faculty")]
    public class FacultyController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private List<Faculty> _allFacultyByDept;
        
        public FacultyController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllFaculty()
        {
            try
            {
                var teachers = _repository.Faculty.GetAllFaculty();
 
                _logger.LogInfo($"Returned all teachers from database. "+Enumerable.Count(teachers));
                
 
                return Ok(teachers);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllFaculty action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        
        [HttpGet("user/{id}", Name ="FacultyByUserId")]
        public IActionResult GetFacultyByUserId(int id)
        {
            
            try
            {

                var facultys = _repository.Faculty.GetAllFaculty();
                Faculty facultyById = new Faculty();
                foreach (Faculty current in facultys)
                {
                    if (current.User_Id == id)
                    {
                        facultyById = current;
                    }
                }
 
                if (facultys.Equals(null))
                {
                    _logger.LogError($"No teachers found");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Faculty with id: {id}");
                    return Ok(facultyById);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetFacultyById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        
        
        [HttpGet("{id}", Name ="FacultyById")]
        public IActionResult GetFacultyById(int id)
        {
            
            try
            {
                var teacher = _repository.Faculty.GetFacultyById(id);
 
                if (teacher.Equals(null))
                {
                    _logger.LogError($"Faculty with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Faculty with id: {id}");
                    return Ok(teacher);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetFacultyById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateFaculty([FromBody]Faculty faculty)
        {
            try
            {
                if(faculty.Equals(null))
                {
                    _logger.LogError("faculty object sent from client is null.");
                    return BadRequest("faculty object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Faculty object sent from client.");
                    return BadRequest("Invalid model object");
                }
                
                _repository.Faculty.CreateFaculty(faculty);

                return Ok(faculty);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateFaculty action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateFaculty(int id, [FromBody]Faculty faculty)
        {
            try
            {
                if (faculty.Equals(null))
                {
                    _logger.LogError("Faculty object sent from client is null.");
                    return BadRequest("Faculty object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Faculty object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbFaculty = _repository.Faculty.GetFacultyById(id);
                if (dbFaculty.Equals(null))
                {
                    _logger.LogError($"Faculty with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Faculty.UpdateFaculty(dbFaculty, faculty);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateFaculty action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Deletefaculty(int id)
        {
            try
            {
                var faculty = _repository.Faculty.GetFacultyById(id);
                if(faculty.Equals(null))
                {
                    _logger.LogError($"Faculty with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Faculty.DeleteFaculty(faculty);
 
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