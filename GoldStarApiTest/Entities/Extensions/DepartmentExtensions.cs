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