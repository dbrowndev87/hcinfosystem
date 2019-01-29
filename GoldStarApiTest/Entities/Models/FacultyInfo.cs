using System;

namespace Entities.Models
{
    public class FacultyInfo
    {
        public int Faculty_Id { get; set; }

        public string Faculty_Status { get; set; }
           
        public int User_Id { get; set; }
        
        public string First_Name { get; set; }

        public string Last_Name { get; set; }

        public string EMail { get; set; }

        public DateTime Birth_Date { get; set; }

        public int Type_Code { get; set; }

        public int Dept_Id { get; set; }

        public string Address { get; set; }
    }
}