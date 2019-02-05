/**
 * Name: FacultyExtension
 * Description: This is a extension class that will create the map method that will be called when updating faculty objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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