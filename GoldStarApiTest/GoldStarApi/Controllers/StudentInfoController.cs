using System;
using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace GoldStarApi.Controllers
{
    [Route("api/studentInfo")]
    public class StudentInfoController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private StudentInfo studentInfoObject;
        private List<StudentInfo> allStudentInfo;
        

        public StudentInfoController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet("{id}", Name ="StudentInfoById")]
        public IActionResult GetStudentInfoById(int id)
        {
            
            try
            {
                
                var studentFromDb = _repository.Student.GetStudentById(id);
                
                studentInfoObject = new StudentInfo();
                

                studentInfoObject.Gpa = studentFromDb.Gpa ;
                studentInfoObject.StudentId = studentFromDb.Student_Id;
                studentInfoObject.Amount_Owing = studentFromDb.Amount_Owing;
                studentInfoObject.Student_Status = studentFromDb.Student_Status;
                
                var userFromDb = _repository.Users.GetUserById(studentFromDb.User_id);
                studentInfoObject.Last_Name = userFromDb.Last_Name;
                studentInfoObject.First_Name = userFromDb.First_Name;
                studentInfoObject.Birth_date = userFromDb.Birth_date;
                studentInfoObject.Address = userFromDb.Address;
                
 
                if (studentFromDb.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
                else
                {
                    _logger.LogInfo($"Returned Student with id: {id}");
                    return Ok(studentInfoObject);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetStudentInfoById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public IActionResult GetAllStudentInfo()
        {

            try
            {
                var allStudents = _repository.Student.GetAllStudents();
                
                allStudentInfo = new List<StudentInfo>();
                
                foreach (Student current in allStudents)
                {
                    studentInfoObject = new StudentInfo
                    {
                        Gpa = current.Gpa,
                        StudentId = current.Student_Id,
                        Amount_Owing = current.Amount_Owing,
                        Student_Status = current.Student_Status
                    };

                    _logger.LogInfo(current.Student_Status);
                    
                    var user = _repository.Users.GetUserById(current.User_id);
                    
                    studentInfoObject.Last_Name= user.Last_Name;
                    studentInfoObject.First_Name = user.First_Name;
                    studentInfoObject.Birth_date = user.Birth_date;
                    studentInfoObject.Address = user.Address;
                    studentInfoObject.EMail = user.EMail;
                    
                    allStudentInfo.Add(studentInfoObject);

                    _logger.LogInfo(studentInfoObject.ToString());
                }


                _logger.LogInfo($"Returned all students from database. " + Enumerable.Count(allStudents));


                return Ok(allStudentInfo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllStudentInfo action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}