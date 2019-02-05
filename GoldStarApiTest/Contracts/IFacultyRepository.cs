/**
 * Name: IFacultyRepository
 * Description: This is an interface to be implemented by all Faculty Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IFacultyRepository
    {
        void CreateFaculty(Faculty faculty);
        void DeleteFaculty(Faculty faculty);
        bool Equals(object obj);
        IEnumerable<Faculty> GetAllFaculty();
        int GetHashCode();
        Faculty GetFacultyById(int facultyId);
        string ToString();
        void UpdateFaculty(Faculty dbfaculty, Faculty faculty);   
    }
}