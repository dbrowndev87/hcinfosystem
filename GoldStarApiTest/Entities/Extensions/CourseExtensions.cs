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