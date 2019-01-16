using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IDepartmentRepository
    {
        void CreateDepartment(Department department);
        void DeleteDepartment(Department department);
        bool Equals(object obj);
        IEnumerable<Department> GetAllDepartments();
        int GetHashCode();
        Department GetDepartmentById(int deptId);
        string ToString();
        void UpdateDepartment(Department dbDepartment, Department department);
    }
}