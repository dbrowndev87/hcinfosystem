using Entities.Models;

namespace Entities.Extensions
{
    public static class FacultyExtensions
    {
        public static void Map(this Faculty dbFaculty, Faculty faculty)
        {
            dbFaculty.Faculty_Id = faculty.Faculty_Id;
            dbFaculty.Faculty_Status = faculty.Faculty_Status;
            dbFaculty.User_Id= faculty.User_Id;
            
        }
    }
}