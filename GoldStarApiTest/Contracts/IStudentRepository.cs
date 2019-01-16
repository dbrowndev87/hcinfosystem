using System.Collections.Generic;
using Entities.Models;

namespace Repository
{
    public interface IStudentRepository
    {
        void CreateStudent(Student student);
        void DeleteStudent(Student student);
        bool Equals(object obj);
        IEnumerable<Student> GetAllStudents();
        int GetHashCode();
        Student GetStudentById(int studentId);
        string ToString();
        void UpdateStudent(Student dbStudent, Student student);
    }
}