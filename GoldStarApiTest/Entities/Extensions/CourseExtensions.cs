/**
 * Name: CourseExtension
 * Description: This is a extension class that will create the map method that will be called when updating course objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Entities.Models;

namespace Entities.Extensions
{
    public static class CourseExtensions
    {
        public static void Map(this Course dbCourse, Course course)
        {
            dbCourse.Course_Id = course.Course_Id;
            dbCourse.Dept_Id = course.Dept_Id;
            dbCourse.Credits = course.Credits;
            dbCourse.Course_Name = course.Course_Name;

        }
    }
}