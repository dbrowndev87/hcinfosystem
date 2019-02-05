/**
 * Name: EnrollmentRepository
 * Description: This is a repository class that implements all of the IEnrollmentRepository methods which are basic methods that
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
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class EnrollmentRepository : RepositoryBase<Enrollment>, IEnrollmentRepository
    {
        public EnrollmentRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Enrollment> GetAllEnrollments()
        {
            return FindAll()
                .OrderBy(ow => ow.Section_Id);
        }

        public Enrollment GetEnrollmentById(int enrollmentId)
        {
            return FindByCondition(enrollment => enrollment.Enrollment_Id.Equals(enrollmentId))
                .DefaultIfEmpty(new Enrollment())
                .FirstOrDefault();
        }
        
        public IEnumerable<Enrollment> GetEnrollmentsByStudentId(int id)
        {
            return FindAll().Where(enrollment => enrollment.Student_Id.Equals(id));

        }

        public void CreateEnrollment(Enrollment enrollment)
        {
            Create(enrollment);
            Save();
        }

        public void UpdateEnrollment(Enrollment dbEnrollment, Enrollment enrollment)
        {
            dbEnrollment.Map(enrollment);
            Update(dbEnrollment);
            Save();
        }

        public void DeleteEnrollment(Enrollment enrollment)
        {
            Delete(enrollment);
            Save();
        }
    }
}