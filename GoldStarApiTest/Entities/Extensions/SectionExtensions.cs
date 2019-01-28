using Entities.Models;

namespace Entities.Extensions
{
    public static class SectionExtensions
    {
        public static void Map(this Section dbSection, Section section)
        {
            dbSection.Section_Id = section.Section_Id;
            dbSection.Course_Id = section.Course_Id;
            dbSection.Vacancy= section.Vacancy;
            dbSection.Faculty_Id= section.Faculty_Id;
            dbSection.Semester= section.Semester;
            dbSection.Start_Date= section.Start_Date;
            dbSection.End_Date= section.End_Date;
            dbSection.Designation= section.Designation;
            
        }
    }
}