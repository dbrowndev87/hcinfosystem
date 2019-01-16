using Entities.Models;

namespace Entities.Extensions
{
    public static class StudentExtensions
    {
        public static void Map(this Student dbStudent, Student student)
        {
            dbStudent.Student_Id = student.Student_Id;
            dbStudent.Student_Status = student.Student_Status;
            dbStudent.Gpa= student.Gpa;
            dbStudent.User_id = student.User_id;
            dbStudent.Amount_Owing = student.Amount_Owing;

        }
    }
}