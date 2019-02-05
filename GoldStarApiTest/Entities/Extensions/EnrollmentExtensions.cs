/**
 * Name: EnrollmentExtension
 * Description: This is a extension class that will create the map method that will be called when updating enrollment objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Entities.Models;

namespace Entities.Extensions
{
    public static class EnrollmentExtensions
    {
        public static void Map(this Enrollment dbEnrollment, Enrollment enrollment)
        {
            dbEnrollment.Enrollment_Id = enrollment.Enrollment_Id;
            dbEnrollment.Student_Id = enrollment.Student_Id;
            dbEnrollment.Section_Id = enrollment.Section_Id;
            dbEnrollment.Grade = enrollment.Grade;
            dbEnrollment.Course_Status = enrollment.Course_Status; 

        }
    }
}