/**
 * Name: UserRepository
 * Description: This is a repository class that implements all of the IUserRepository methods which are basic methods that
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
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<User> GetAllUsers()
        {
            
            return FindAll()
                .OrderBy(ow => ow.Last_Name);
        }

        public IEnumerable<User> GetLastId()
        {
            return FindAll()
                .OrderBy(user => user.User_Id);
        }

        public User GetUserById(int userid)
        {
            return FindByCondition(user => user.User_Id.Equals(userid))
                .DefaultIfEmpty(new User())
                .FirstOrDefault();
        }

        public void CreateUser(User user)
        {
            Create(user);
            Save();
        }

        public void UpdateUser(User dbuser, User user)
        {
            dbuser.Map(user);
            Update(dbuser);
            Save();
        }

        public void DeleteUser(User user)
        {
            Delete(user);
            Save();
        }
    }
}