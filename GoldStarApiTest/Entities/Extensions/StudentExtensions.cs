using Entities.Models;

namespace Entities.Extensions
{
    public static class StudentExtensions
    {
        public static void Map(this Student dbStudent, Student student)
        {
            dbStudent.StudentId = student.StudentId;
            dbStudent.Student_Status = student.Student_Status;
            dbStudent.Gpa= student.Gpa;
            dbStudent.User_id = student.User_id;
            
        }
    }
}