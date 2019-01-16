using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class CourseRepository : RepositoryBase<Course>, ICourseRepository
    {
        public CourseRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Course> GetAllCourses()
        {
            return FindAll()
                .OrderBy(ow => ow.Course_Id);
        }

        public Course GetCourseById(string courseId)
        {
            return FindByCondition(course => course.Course_Id.Equals(courseId))
                .DefaultIfEmpty(new Course())
                .FirstOrDefault();
        }

        public void CreateCourse(Course course)
        {
            Create(course);
            Save();
        }

        public void UpdateCourse(Course dbCourse, Course course)
        {
            dbCourse.Map(course);
            Update(dbCourse);
            Save();
        }

        public void DeleteCourse(Course course)
        {
            Delete(course);
            Save();
        }
    }
}