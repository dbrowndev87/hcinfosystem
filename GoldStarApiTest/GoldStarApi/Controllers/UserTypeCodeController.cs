/**
 * Name: UserTypeCodeController
 * Description: This is the controller for the UserTypeCode interface. This controller is modeled after the UserTypeCode database
 *     table. It will house all of the API end points for interactions with usertypecode objects. The basic GET, POST,
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
    [Route("api/usertypecode")]
    public class UserTypeCodeController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public UserTypeCodeController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllTypeCodes()
        {
            try
            {
                var typecodes = _repository.TypeCode.GetAllTypeCodes();
               
 
                _logger.LogInfo($"Returned all typecodes from database. " + typecodes);
                
 
                return Ok(typecodes);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllTypeCodes action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name ="TypeCodeByCode")]
        public IActionResult GetTypeCodeById(int id)
        {
            
            try
            {
                
                    var typeCode = _repository.TypeCode.GetTypeCodeById(id);

                    if (typeCode.Equals(null))
                    {
                        _logger.LogError($"TypeCode with id: {id}, hasn't been found in db.");
                        return NotFound();
                    }
                    else
                    {
                        _logger.LogInfo($"Returned typecode with id: {id}");
                        return Ok(typeCode);
                    }
       
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetTypeCodeById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateTypeCodes([FromBody]UserTypeCode typeCode)
        {
            try
            {
                if(typeCode.Equals(null))
                {
                    _logger.LogError("TypeCode object sent from client is null.");
                    return BadRequest("TypeCOde object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid TypeCode object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                
                _repository.TypeCode.CreateUserTypeCode(typeCode);

                return Ok(typeCode);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateTypeCode action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateTypeCode(int id, [FromBody]UserTypeCode typeCode)
        {
            try
            {
                if (typeCode.Equals(null))
                {
                    _logger.LogError("UserType object sent from client is null.");
                    return BadRequest("UserType object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid UserType object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbTypeCode = _repository.TypeCode.GetTypeCodeById(id);
                if (dbTypeCode.Equals(null))
                {
                    _logger.LogError($"TypeCode with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.TypeCode.UpdateUserTypeCode(dbTypeCode, typeCode);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateTypeCode action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTypeCode(int id)
        {
            try
            {
                var typeCode = _repository.TypeCode.GetTypeCodeById(id);
                if(typeCode.Equals(null))
                {
                    _logger.LogError($"UserType with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.TypeCode.DeleteUserTypeCode(typeCode);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteTypeCode action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}