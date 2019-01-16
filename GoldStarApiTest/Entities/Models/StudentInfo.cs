using System;

namespace Entities.Models
{
    public class StudentInfo
    {
        //from Student Object
        public int StudentId { get; set; }
        public string Student_Status { get; set; }
        public double Gpa { get; set; }
        public double Amount_Owing { get; set; }
        //From User Object
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public DateTime Birth_date { get; set; }
        public string Address { get; set; }
        public string EMail { get; set; }
    }
}