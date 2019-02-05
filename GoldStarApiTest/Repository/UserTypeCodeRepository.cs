/**
 * Name: UserTypeCodeRepository
 * Description: This is a repository class that implements all of the IUserTypeCodeRepository methods which are basic methods that
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
    public class UserTypeCodeRepository : RepositoryBase<UserTypeCode>, IUserTypeCodeRepository
    {
        public UserTypeCodeRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<UserTypeCode> GetAllTypeCodes()
        {
            
            return FindAll()
                .OrderBy(ow => ow.Type_Code);
        }

        public UserTypeCode GetTypeCodeById(int typeCode)
        {
            return FindByCondition(typecode => typecode.Type_Code.Equals(typeCode))
                .DefaultIfEmpty(new UserTypeCode())
                .FirstOrDefault();
        }

        public void CreateUserTypeCode(UserTypeCode typeCode)
        {
            Create(typeCode);
            Save();
        }

        public void UpdateUserTypeCode(UserTypeCode dbTypeCode, UserTypeCode typeCode)
        {
            dbTypeCode.Map(typeCode);
            Update(dbTypeCode);
            Save();
        }

        public void DeleteUserTypeCode(UserTypeCode typeCode)
        {
            Delete(typeCode);
            Save();
        }
    }
}