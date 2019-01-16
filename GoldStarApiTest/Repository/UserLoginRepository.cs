using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class UserLoginRepository : RepositoryBase<UserLogin>, IUserLoginRepository
    {
        public UserLoginRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<UserLogin> GetAllUserLogins()
        {
            return FindAll()
                .OrderBy(ow => ow.Username);
        }

        public UserLogin GetUserLoginByUsername(string username)
        {
            return FindByCondition(userLogin => userLogin.Username.Equals(username))
                .DefaultIfEmpty(new UserLogin())
                .FirstOrDefault();
        }

        public UserLogin GetUserLoginByUserId(int userid)
        {
            return FindByCondition(userLogin => userLogin.User_Id.Equals(userid))
                .DefaultIfEmpty(new UserLogin())
                .FirstOrDefault();
        }

        public void CreateUserLogin(UserLogin userLogin)
        {
            Create(userLogin);
            Save();
        }

        public void UpdateUserLogin(UserLogin dbUserLogin, UserLogin userLogin)
        {
            dbUserLogin.Map(userLogin);
            Update(dbUserLogin);
            Save();
        }

        public void DeleteUserLogin(UserLogin userLogin)
        {
            Delete(userLogin);
            Save();
        }

        public void DeleteByUserId(int userid)
        {
            UserLogin userLogin;

            userLogin = FindByCondition(user => user.User_Id.Equals(userid))
                .DefaultIfEmpty(new UserLogin())
                .FirstOrDefault();

            Delete(userLogin);
            Save();
        }

        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }
}