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
    [Route("api/section")]
    public class SectionController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public SectionController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllSections()
        {
            try
            {
                var sections = _repository.Section.GetAllSections();
 
                _logger.LogInfo($"Returned all sections from database. "+Enumerable.Count(sections));
                
 
                return Ok(sections);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllSections action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("{id}", Name ="SectionById")]
        public IActionResult GetSectionById(int id)
        {
            
            try
            {
                var section = _repository.Section.GetSectionById(id);
 
                if (section.Equals(null))
                {
                    _logger.LogError($"Section with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Section with id: {id}");
                    return Ok(section);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetSectionById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("faculty/{id}", Name ="SectionByFacultyId")]
        public IActionResult GetSectionsByFacultyId(int id)
        {
            
            try
            {
                var sections = _repository.Section.GetAllSections();
                List<Section> sectionsById = new List<Section>();
                foreach (var section in sections)
                {
                    if (section.Faculty_Id == id)
                    {
                        sectionsById.Add(section);
                    }
                }
 
                if (sections.Equals(null))
                {
                    _logger.LogError($"No sections were found.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Section with id: {id}");
                    return Ok(sectionsById);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetSectionById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateSection([FromBody]Section section)
        {
            try
            {
                if(section.Equals(null))
                {
                    _logger.LogError("Section object sent from client is null.");
                    return BadRequest("Section object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Section object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                
                _repository.Section.CreateSection(section);

                return Ok(section);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateSection action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateSection(int id, [FromBody]Section section)
        {
            try
            {
                if (section.Equals(null))
                {
                    _logger.LogError("Section object sent from client is null.");
                    return BadRequest("Section object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Section object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbSection = _repository.Section.GetSectionById(id);
                if (dbSection.Equals(null))
                {
                    _logger.LogError($"Section with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Section.UpdateSection(dbSection, section);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateSection action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteSection(int id)
        {
            try
            {
                var section = _repository.Section.GetSectionById(id);
                if(section.Equals(null))
                {
                    _logger.LogError($"Section with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Section.DeleteSection(section);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteSection action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}