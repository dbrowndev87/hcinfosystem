/**
 * Name: UserLoginController
 * Description: This is the controller for the UserLogin interface. This controller is modeled after the UserLogin database
 *     table. It will house all of the API end points for interactions with userLogin objects. The basic GET, POST,
 *     PUT, and DELETE database HTTP requests are used here as well as GET by id passed, and some custom endpoints that
 *     accept ids or other attributes from other models.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System;
using System.Linq;
using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace GoldStarApi.Controllers
{
    [Route("api/userlogin")]
    public class UserLoginController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public UserLoginController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllUsersLogins()
        {
            try
            {
                var userLogins = _repository.UserLogin.GetAllUserLogins();
 
                _logger.LogInfo($"Returned all userlogins from database. "+Enumerable.Count(userLogins));
                
 
                return Ok(userLogins);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UserLogin action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        

        [HttpGet("username/{username}", Name = "UserByUsername")]
        public IActionResult GetUserByUsername(string username)
        {

            try
            {
                var user = _repository.UserLogin.GetUserLoginByUsername(username);

                if (user.Equals(null))
                {
                    _logger.LogError($"User with username: {username}, hasn't been found in db.");
                    return NotFound();
                } else
                {
                    _logger.LogInfo($"Returned user with username: {username}");
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetUserById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody]UserLogin userLogin)
        {
            try
            {
                if(userLogin.Equals(null))
                {
                    _logger.LogError("UserLogin object sent from client is null.");
                    return BadRequest("UserLogin object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid UserLogin object sent from client.");
                    return BadRequest("Invalid model object");
                }

                
                _repository.UserLogin.CreateUserLogin(userLogin);

                return Ok(userLogin);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateUserLogin action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{username}")]
        public IActionResult UpdateUserLogin(string username, [FromBody]UserLogin userLogin)
        {
            try
            {
                if (userLogin.Equals(null))
                {
                    _logger.LogError("UserLogin object sent from client is null.");
                    return BadRequest("UserLogin object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid UserLogin object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbUserLogin = _repository.UserLogin.GetUserLoginByUsername(username);
                if (dbUserLogin.Equals(null))
                {
                    _logger.LogError($"User with id: {username}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.UserLogin.UpdateUserLogin(dbUserLogin, userLogin);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateUserLogin action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{username}")]
        public IActionResult DeleteUser(string username)
        {
            try
            {
                var userLogin = _repository.UserLogin.GetUserLoginByUsername(username);
                if(userLogin.Equals(null))
                {
                    _logger.LogError($"User with id: {username}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.UserLogin.DeleteUserLogin(userLogin);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteUserLogin action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("deleteuserid/{id}")]
        public IActionResult DeleteUserByUserId(int userid)
        {
            try
            {
                var userLogin = _repository.UserLogin.GetUserLoginByUserId(userid);
                if (userLogin.Equals(null))
                {
                    _logger.LogError($"User with id: {userid}, hasn't been found in db.");
                    return NotFound();
                }

                _repository.UserLogin.DeleteByUserId(userid);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteUser action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


    }
}