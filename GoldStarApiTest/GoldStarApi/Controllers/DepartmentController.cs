using System;
using System.Linq;
using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace GoldStarApi.Controllers
{
    [Route("api/department")]
    public class DepartmentController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public DepartmentController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            try
            {
                var departments = _repository.Department.GetAllDepartments();
               
 
                _logger.LogInfo($"Returned all departments from database. " + departments);
                
 
                return Ok(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllDepartments action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name ="DepartmentById")]
        public IActionResult GetDepartmentById(int id)
        {
            
            try
            {
                // Get user ID Modified to return the Last id when 0 is sent.
                    var user = _repository.Department.GetDepartmentById(id);

                    if (user.Equals(null))
                    {
                        _logger.LogError($"Department with id: {id}, hasn't been found in db.");
                        return NotFound();
                    }
                    else
                    {
                        _logger.LogInfo($"Returned Department with id: {id}");
                        return Ok(user);
                    }
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetDepartmentById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateDepartment([FromBody]Department department)
        {
            try
            {
                if(department.Equals(null))
                {
                    _logger.LogError("Department object sent from client is null.");
                    return BadRequest("Department object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Department object sent from client.");
                    return BadRequest("Invalid model object");
                }
                
                _repository.Department.CreateDepartment(department);

                return Ok(department);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateDepartment action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, [FromBody]Department department)
        {
            try
            {
                if (department.Equals(null))
                {
                    _logger.LogError("Department object sent from client is null.");
                    return BadRequest("Department object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Department object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbDepartment = _repository.Department.GetDepartmentById(id);
                if (dbDepartment.Equals(null))
                {
                    _logger.LogError($"Department with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Department.UpdateDepartment(dbDepartment, department);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateDepartment action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            try
            {
                var department = _repository.Department.GetDepartmentById(id);
                if(department.Equals(null))
                {
                    _logger.LogError($"Department with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Department.DeleteDepartment(department);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteDepartment action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}