/**
 * Name: DepartmentRepository
 * Description: This is a repository class that implements all of the IDepartmentRepository methods which are basic methods that
 *         give access to manipulate database information. This class will also call the repositoryBase methods for direct
 *         manipulation of db data. 
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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