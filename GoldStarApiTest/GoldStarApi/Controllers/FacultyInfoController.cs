using System;
using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace GoldStarApi.Controllers
{
    [Route("api/facultyInfo")]
    public class FacultyInfoController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private FacultyInfo facultyInfoObject;
        private List<FacultyInfo> allFacultyInfo;


        public FacultyInfoController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet("{id}", Name = "FacultyInfoById")]
        public IActionResult GetFacultyInfoById(int id)
        {

            try
            {

                var facultyFromDb = _repository.Faculty.GetFacultyById(id);


                if (facultyFromDb.Equals(null))
                {
                    _logger.LogError($"Faculty with id: {id}, hasn't been found in db.");
                    return NotFound();
                }


                _logger.LogInfo($"Returned Faculty with id: {id}");
                facultyInfoObject = new FacultyInfo();


                facultyInfoObject.Faculty_Status = facultyFromDb.Faculty_Status;
                facultyInfoObject.Faculty_Id = facultyFromDb.Faculty_Id;
                facultyInfoObject.User_Id = facultyFromDb.User_Id;
                //facultyInfoObject.Start_Date = facultyFromDb.Start_Date;

                var userFromDb = _repository.Users.GetUserById(facultyFromDb.User_Id);
                facultyInfoObject.Last_Name = userFromDb.Last_Name;
                facultyInfoObject.First_Name = userFromDb.First_Name;
                facultyInfoObject.Birth_Date = userFromDb.Birth_Date;
                facultyInfoObject.Address = userFromDb.Address;
                facultyInfoObject.EMail = userFromDb.EMail;
                facultyInfoObject.Dept_Id = userFromDb.Dept_Id;
                facultyInfoObject.Type_Code = userFromDb.Type_Code;
                facultyInfoObject.User_Id = userFromDb.User_Id;
                return Ok(facultyInfoObject);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetFacultyInfoById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public IActionResult GetAllFacultyInfo()
        {
            try
            {
                var allFaculty = _repository.Faculty.GetAllFaculty();

                allFacultyInfo = new List<FacultyInfo>();

                foreach (Faculty current in allFaculty)
                {
                    facultyInfoObject = new FacultyInfo
                    {
                        Faculty_Id = current.Faculty_Id,
                        Faculty_Status = current.Faculty_Status,
                        User_Id = current.User_Id,
                        //Start_Date = current.Start_Date,

                    };

                    var user = _repository.Users.GetUserById(current.User_Id);

                    facultyInfoObject.Last_Name = user.Last_Name;
                    facultyInfoObject.First_Name = user.First_Name;
                    facultyInfoObject.Birth_Date = user.Birth_Date;
                    facultyInfoObject.Address = user.Address;
                    facultyInfoObject.EMail = user.EMail;
                    facultyInfoObject.Dept_Id = user.Dept_Id;
                    facultyInfoObject.Type_Code = user.Type_Code;
                    facultyInfoObject.User_Id = user.User_Id;
                   

                    allFacultyInfo.Add(facultyInfoObject);

                    _logger.LogInfo(facultyInfoObject.ToString());
                }


                _logger.LogInfo($"Returned all faculty from database. " + Enumerable.Count(allFaculty));


                return Ok(allFacultyInfo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllFacultyInfo action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("department/{id}", Name = "FacultyByDepartmentId")]
        public IActionResult GetFacultyByDepartmentId(int id)
        {

            var allFaculty = _repository.Faculty.GetAllFaculty();

            allFacultyInfo = new List<FacultyInfo>();

            foreach (Faculty current in allFaculty)
            {
                facultyInfoObject = new FacultyInfo
                {
                    Faculty_Id = current.Faculty_Id,
                    Faculty_Status = current.Faculty_Status,
                    User_Id = current.User_Id,
                    //Start_Date = current.Start_Date,

                };

                var user = _repository.Users.GetUserById(current.User_Id);

                facultyInfoObject.Last_Name = user.Last_Name;
                facultyInfoObject.First_Name = user.First_Name;
                facultyInfoObject.Birth_Date = user.Birth_Date;
                facultyInfoObject.Address = user.Address;
                facultyInfoObject.EMail = user.EMail;
                facultyInfoObject.Dept_Id = user.Dept_Id;
                facultyInfoObject.Type_Code = user.Type_Code;
                facultyInfoObject.User_Id = user.User_Id;

                allFacultyInfo.Add(facultyInfoObject);

                _logger.LogInfo(facultyInfoObject.ToString());
            }
            
           List<FacultyInfo > facultyByDepartment = new List<FacultyInfo>();

            foreach (var current in allFacultyInfo)
            {
                if (current.Dept_Id == id)
                {
                    facultyByDepartment.Add(current);
                }
            }

            _logger.LogInfo("Number of faculty: "+ allFacultyInfo.Count);
            return Ok(facultyByDepartment);


        }

    }
}

