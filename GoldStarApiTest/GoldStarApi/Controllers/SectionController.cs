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
        private List<CourseInformation> allSectionCourseInfo;
        
        
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
        
        [HttpGet("student/{id}", Name ="SectionsByStudentId")]
        public IActionResult GetSectionsByStudentId(int id)
        {
            
            try
            {
                var sections = _repository.Enrollment.GetAllEnrollments();
                List<Section> sectionsById = new List<Section>();
                foreach (var section in sections)
                {
                   // if (section. == id)
                   // {
                   //     sectionsById.Add(section);
                   // }
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

        [HttpGet("courseInfo", Name ="GetAllSectionCourseInfo")]
        public IActionResult GetAllSectionCourseInfo()
        {
            
            try
            {
                var allSections = _repository.Section.GetAllSections();
                allSectionCourseInfo = new List<CourseInformation>();
                if (allSections.Equals(null))
                {
                    _logger.LogError($"No sections were found");
                    return NotFound();
                }
                
                foreach (var current in allSections)
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
                    
                    allSectionCourseInfo.Add(currentCourse);
                    
                }

                    _logger.LogInfo($"Returned All Section Course Information");
                   return Ok(allSectionCourseInfo);
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEnrollment ById action: {ex.Message}");
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