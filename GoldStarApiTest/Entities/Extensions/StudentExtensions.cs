/**
 * Name: StudentExtension
 * Description: This is a extension class that will create the map method that will be called when updating student objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Entities.Models;

namespace Entities.Extensions
{
    public static class StudentExtensions
    {
        public static void Map(this Student dbStudent, Student student)
        {
            dbStudent.Student_Id = student.Student_Id;
            dbStudent.Student_Status = student.Student_Status;
            dbStudent.Gpa= student.Gpa;
            dbStudent.User_Id = student.User_Id;
            dbStudent.Amount_Owing = student.Amount_Owing;

        }
    }
}