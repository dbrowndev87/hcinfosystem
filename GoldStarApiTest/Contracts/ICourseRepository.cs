/**
 * Name: ICourseRepository
 * Description: This is an interface to be implemented by all Course Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */

using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface ICourseRepository
    {
        void CreateCourse(Course course);
        void DeleteCourse(Course course);
        bool Equals(object obj);
        IEnumerable<Course> GetAllCourses();
        int GetHashCode();
        Course GetCourseById(string courseId);
        string ToString();
        void UpdateCourse(Course dbCourse, Course course);
    }
}