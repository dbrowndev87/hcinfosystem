/**
 * Name: IEnrollmentRepository
 * Description: This is an interface to be implemented by all Enrollment Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IEnrollmentRepository
    {
        void CreateEnrollment(Enrollment enrollment);
        void DeleteEnrollment(Enrollment enrollment);
        bool Equals(object obj);
        IEnumerable<Enrollment> GetAllEnrollments();
        IEnumerable<Enrollment> GetEnrollmentsByStudentId(int id);
        int GetHashCode();
        Enrollment GetEnrollmentById(int id);
        string ToString();
        void UpdateEnrollment(Enrollment dbEnrollment, Enrollment enrollment);
    }
    
}