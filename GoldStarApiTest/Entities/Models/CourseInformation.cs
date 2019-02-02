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