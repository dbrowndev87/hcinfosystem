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