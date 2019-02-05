/**
 * Name: CourseInformation
 * Description: This is a model class for a CourseInformation object. It is a combination of course and section objects
 *         in order to get all course information into one object to be returned by an end point. This will
 *         allow one api endpoint call to get all course information instead of making one for each object.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System;

namespace Entities.Models
{
    public class CourseInformation
    {
        public int Section_Id { get; set; }
 
   
        public int Faculty_Id { get; set; }
   
        public string Semester { get; set; }

        public int Vacancy { get; set; }
      
        public string Course_Id { get; set; }
 
     
        public DateTime Start_Date { get; set; }
        
     
        public DateTime End_Date { get; set; }

        public string Designation { get; set; }

        public string Course_Name { get; set; }
      
        public int Dept_Id { get; set; }

       
        public int Credits { get; set; }
    }
}