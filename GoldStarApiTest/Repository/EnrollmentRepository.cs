using System;
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
            return FindByCondition(enrollment => enrollment.Equals(enrollmentId))
                .DefaultIfEmpty(new Enrollment())
                .FirstOrDefault();
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