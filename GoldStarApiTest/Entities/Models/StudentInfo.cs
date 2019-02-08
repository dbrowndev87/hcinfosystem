/**
 * Name: StudentInfo
 * Description: This is a model class for a StudentInfo object. It is a combination of student and user objects
 *         in order to get all course information into one object to be returned by an end point. This will
 *         allow one api endpoint call to get all course information instead of making one for each object.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System;

namespace Entities.Models
{
    public class StudentInfo
    {
        //from Student Object
        public int Student_Id { get; set; }

        public int Type_Code { get; set; }

        public int User_Id { get; set; }
        public string Student_Status { get; set; }
        
        public int Dept_Id { get; set; }
        public double Gpa { get; set; }
        public double Amount_Owing { get; set; }
        //From User Object
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public DateTime Birth_Date { get; set; }
        public string Address { get; set; }
        public string EMail { get; set; }
       
        public DateTime Start_Date { get; set; }
    }
}