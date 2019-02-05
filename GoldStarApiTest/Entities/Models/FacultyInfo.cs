/**
 * Name: FacultyInformation
 * Description: This is a model class for a FacultyInformation object. It is a combination of faculty and user objects
 *         in order to get all course information into one object to be returned by an end point. This will
 *         allow one api endpoint call to get all course information instead of making one for each object.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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