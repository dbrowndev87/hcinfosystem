/**
 * Name: StudentInfoController
 * Description: This is the controller for the StudentInfo interface. 
 *     It will house all of the API end points for interactions with StudentInfo objects. These objects are made by 
 *     joining the student table and the user table to get all of the information associated with a student id. This
 *     controller is used to accept the student id from the front end and return all associated information by that
 *     student id. There are also other custom GET http requests to get more specific information. 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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
                
 
                if (studentFromDb.Equals(null))
                {
                    _logger.LogError($"Student with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
             
                    _logger.LogInfo($"Returned Student with id: {id}");


                    studentInfoObject = new StudentInfo
                    {
                        Gpa = studentFromDb.Gpa,
                        Student_Id = studentFromDb.Student_Id,
                        Amount_Owing = studentFromDb.Amount_Owing,
                        Student_Status = studentFromDb.Student_Status
                    };



                    var userFromDb = _repository.Users.GetUserById(studentFromDb.User_Id);
                    studentInfoObject.Last_Name = userFromDb.Last_Name;
                    studentInfoObject.First_Name = userFromDb.First_Name;
                    studentInfoObject.Birth_Date = userFromDb.Birth_Date;
                    studentInfoObject.Address = userFromDb.Address;
                    studentInfoObject.EMail = userFromDb.EMail;
                    studentInfoObject.Dept_Id = userFromDb.Dept_Id;
                    studentInfoObject.Type_Code = userFromDb.Type_Code;
                    studentInfoObject.User_Id = userFromDb.User_Id;
                    studentInfoObject.Start_Date = userFromDb.Start_Date;
                    return Ok(studentInfoObject);
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetStudentInfoById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
       
        [HttpGet("section/{id}", Name ="AllInfoBySectionId")]
        public IActionResult GetAllInfoBySectionId(int id)
        {
            
            try
            {
                
        // get all enrollments
                var enrollments = _repository.Enrollment.GetAllEnrollments();
                
                if (enrollments.Equals(null))
                {
                    _logger.LogError($"No Enrollments found");
                    return NotFound();
                }
                // new studentInfo List
                allStudentInfo = new List<StudentInfo>(); 

                // check all enrollments for the section id
                foreach (var enrollment in enrollments)
                {
                    var studentInfoCurrent = new StudentInfo();
                    
                    if (enrollment.Section_Id == id)
                    {
                       // if the section id matches get their studentInfo from studentId in enrollment
                       studentInfoCurrent = getStudentInfoFromId(enrollment.Student_Id);
                       // add student to studentInfo List
                       allStudentInfo.Add(studentInfoCurrent);
                    }
                
                }
                
                // return all studentInfo for a section
                return Ok(allStudentInfo);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetStudentInfoById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        public StudentInfo getStudentInfoFromId(int studentId)
        {
            var studentFromDb = _repository.Student.GetStudentById(studentId);
                
 
            if (studentFromDb.Equals(null))
            {
                _logger.LogError($"Student with id: {studentId}, hasn't been found in db.");
                return null;
            }

            studentInfoObject = new StudentInfo
            {
                Gpa = studentFromDb.Gpa,
                Student_Id = studentFromDb.Student_Id,
                Amount_Owing = studentFromDb.Amount_Owing,
                Student_Status = studentFromDb.Student_Status
            };
                        
            var userFromDb = _repository.Users.GetUserById(studentFromDb.User_Id);
            studentInfoObject.Last_Name = userFromDb.Last_Name;
            studentInfoObject.First_Name = userFromDb.First_Name;
            studentInfoObject.Birth_Date = userFromDb.Birth_Date;
            studentInfoObject.Address = userFromDb.Address;
            studentInfoObject.EMail = userFromDb.EMail;
            studentInfoObject.Dept_Id = userFromDb.Dept_Id;
            studentInfoObject.Type_Code = userFromDb.Type_Code;
            studentInfoObject.User_Id = userFromDb.User_Id;
            studentInfoObject.Start_Date = userFromDb.Start_Date;

            return studentInfoObject;

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
                        Student_Id = current.Student_Id,
                        Amount_Owing = current.Amount_Owing,
                        Student_Status = current.Student_Status,
                    };

                    _logger.LogInfo(current.Student_Status);
                    
                    var user = _repository.Users.GetUserById(current.User_Id);
                    
                    studentInfoObject.Last_Name= user.Last_Name;
                    studentInfoObject.First_Name = user.First_Name;
                    studentInfoObject.Birth_Date = user.Birth_Date;
                    studentInfoObject.Address = user.Address;
                    studentInfoObject.EMail = user.EMail;
                    studentInfoObject.Dept_Id = user.Dept_Id;
                    studentInfoObject.Type_Code = user.Type_Code;
                    studentInfoObject.User_Id = user.User_Id;
                    studentInfoObject.Start_Date = user.Start_Date;
                    
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