using System;
using System.Linq;
using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace GoldStarApi.Controllers
{
    [Route("api/user")]
    public class UserController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public UserController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _repository.Users.GetAllUsers();
               
 
                _logger.LogInfo($"Returned all students from database. " + users);
                
 
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllUsers action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name ="UserById")]
        public IActionResult GetUserById(int id)
        {
            
            try
            {
                // Get user ID Modified to return the Last id when 0 is sent.
                if (id > 0)
                {
                    var user = _repository.Users.GetUserById(id);

                    if (user.Equals(null))
                    {
                        _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                        return NotFound();
                    }
                    else
                    {
                        _logger.LogInfo($"Returned Student with id: {id}");
                        return Ok(user);
                    }
                } else
                {
                    var users = _repository.Users.GetLastId();
                    var lastId = 0;
                    
                    foreach (User user in users)
                    {
                        if(user.User_Id > lastId)
                        {
                            lastId = user.User_Id;
                        }
                    }

                    return Ok(lastId);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGameById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateUser([FromBody]User user)
        {
            try
            {
                if(user.Equals(null))
                {
                    _logger.LogError("Student object sent from client is null.");
                    return BadRequest("Student object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Student object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                _logger.LogError("Look Here"+user.User_Id);
                
                _repository.Users.CreateUser(user);

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateOwner action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody]User user)
        {
            try
            {
                if (user.Equals(null))
                {
                    _logger.LogError("Student object sent from client is null.");
                    return BadRequest("Student object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Student object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbuser = _repository.Users.GetUserById(id);
                if (dbuser.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Users.UpdateUser(dbuser, user);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateGame action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                var user = _repository.Users.GetUserById(id);
                if(user.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Users.DeleteUser(user);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteGame action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}