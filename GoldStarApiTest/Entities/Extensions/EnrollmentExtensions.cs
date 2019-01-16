using Entities.Models;

namespace Entities.Extensions
{
    public static class EnrollmentExtensions
    {
        public static void Map(this Enrollment dbEnrollment, Enrollment enrollment)
        {
            dbEnrollment.Enrollment_Id = enrollment.Enrollment_Id;
            dbEnrollment.Student_Id = enrollment.Student_Id;
            dbEnrollment.Section_Id = enrollment.Section_Id;
            dbEnrollment.Grade = enrollment.Grade;
            dbEnrollment.Course_Status = enrollment.Course_Status; 

        }
    }
}