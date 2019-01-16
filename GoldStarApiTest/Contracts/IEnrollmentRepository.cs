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
        int GetHashCode();
        Enrollment GetEnrollmentById(int enrollmentId);
        string ToString();
        void UpdateEnrollment(Enrollment dbEnrollment, Enrollment enrollment);
    }
    
}