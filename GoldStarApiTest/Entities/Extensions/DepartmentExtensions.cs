/**
 * Name: DepartmentExtension
 * Description: This is a extension class that will create the map method that will be called when updating department objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Entities.Models;

namespace Entities.Extensions
{
    public static class DepartmentExtensions
    {
        public static void Map(this Department dbDepartment, Department department)
        {
            dbDepartment.Dept_Id = department.Dept_Id;
            dbDepartment.Dept_Name = department.Dept_Name;

        }
    }
}