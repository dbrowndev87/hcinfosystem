/**
 * Name: StudentRepository
 * Description: This is a repository class that implements all of the IStudentRepository methods which are basic methods that
 *         give access to manipulate database information. This class will also call the repositoryBase methods for direct
 *         manipulation of db data. 
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
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
                .OrderBy(ow => ow.Student_Id);
        }

        public Student GetStudentById(int studentId)
        {
            return FindByCondition(student => student.Student_Id.Equals(studentId))
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