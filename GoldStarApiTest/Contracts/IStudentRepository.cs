/**
 * Name: IStudentRepository
 * Description: This is an interface to be implemented by all Student Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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