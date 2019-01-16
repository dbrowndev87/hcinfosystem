using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class FacultyRepository : RepositoryBase<Faculty>, IFacultyRepository
    {
        public FacultyRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Faculty> GetAllFaculty()
        {
            return FindAll()
                .OrderBy(ow => ow.Faculty_Id);
        }

        public Faculty GetFacultyById(int facultyId)
        {
            return FindByCondition(faculty => faculty.Faculty_Id.Equals(facultyId))
                .DefaultIfEmpty(new Faculty())
                .FirstOrDefault();
        }

        public void CreateFaculty(Faculty faculty)
        {
            Create(faculty);
            Save();
        }

        public void UpdateFaculty(Faculty dbFaculty, Faculty faculty)
        {
            dbFaculty.Map(faculty);
            Update(dbFaculty);
            Save();
        }

        public void DeleteFaculty(Faculty faculty)
        {
            Delete(faculty);
            Save();
        }
    }
}