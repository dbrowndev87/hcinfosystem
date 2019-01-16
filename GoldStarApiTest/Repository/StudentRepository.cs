using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class StudentRepository : RepositoryBase<Student>, IStudentRepository
    {
        public StudentRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Student> GetAllStudents()
        {
            return FindAll()
                .OrderBy(ow => ow.StudentId);
        }

        public Student GetStudentById(int studentId)
        {
            return FindByCondition(student => student.StudentId.Equals(studentId))
                .DefaultIfEmpty(new Student())
                .FirstOrDefault();
        }

        public void CreateStudent(Student student)
        {
            Create(student);
            Save();
        }

        public void UpdateStudent(Student dbStudent, Student student)
        {
            dbStudent.Map(student);
            Update(dbStudent);
            Save();
        }

        public void DeleteStudent(Student student)
        {
            Delete(student);
            Save();
        }
    }
}