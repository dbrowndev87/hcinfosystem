using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class DepartmentRepository : RepositoryBase<Department>, IDepartmentRepository
    {
        public DepartmentRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            return FindAll()
                .OrderBy(ow => ow.Dept_Id);
        }

        public Department GetDepartmentById(int deptId)
        {
            return FindByCondition(department => department.Dept_Id.Equals(deptId))
                .DefaultIfEmpty(new Department())
                .FirstOrDefault();
        }

        public void CreateDepartment(Department department)
        {
            Create(department);
            Save();
        }

        public void UpdateDepartment(Department dbDepartment, Department department)
        {
            dbDepartment.Map(department);
            Update(dbDepartment);
            Save();
        }

        public void DeleteDepartment(Department department)
        {
            Delete(department);
            Save();
        }
    }
}