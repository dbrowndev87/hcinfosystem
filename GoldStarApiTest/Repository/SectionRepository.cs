using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class SectionRepository : RepositoryBase<Section>, ISectionRepository
    {
        public SectionRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Section> GetAllSections()
        {
            return FindAll()
                .OrderBy(ow => ow.Section_Id);
        }

        public Section GetSectionById(int sectionId)
        {
            return FindByCondition(section => section.Section_Id.Equals(sectionId))
                .DefaultIfEmpty(new Section())
                .FirstOrDefault();
        }

        public void CreateSection(Section section)
        {
            Create(section);
            Save();
        }

        public void UpdateSection(Section dbSection, Section section)
        {
            dbSection.Map(section);
            Update(dbSection);
            Save();
        }

        public void DeleteSection(Section section)
        {
            Delete(section);
            Save();
        }
    }
}