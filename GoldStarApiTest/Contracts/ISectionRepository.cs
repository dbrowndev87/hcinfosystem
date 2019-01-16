using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface ISectionRepository
    {
        void CreateSection(Section section);
        void DeleteSection(Section section);
        bool Equals(object obj);
        IEnumerable<Section> GetAllSections();
        int GetHashCode();
        Section GetSectionById(int sectionId);
        string ToString();
        void UpdateSection(Section dbSection, Section section);   
    }
}