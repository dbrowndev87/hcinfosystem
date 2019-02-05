/**
 * Name: IUserTypeCodeRepository
 * Description: This is an interface to be implemented by all UserTypeCode Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IUserTypeCodeRepository
    {
        void CreateUserTypeCode(UserTypeCode typeCode);
        void DeleteUserTypeCode(UserTypeCode typeCode);
        bool Equals(object obj);
        IEnumerable<UserTypeCode> GetAllTypeCodes();
        int GetHashCode();
        UserTypeCode GetTypeCodeById(int typeCode);
        string ToString();
        void UpdateUserTypeCode(UserTypeCode dbTypeCode, UserTypeCode typeCode);
    }
}