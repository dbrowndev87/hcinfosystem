using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IUserLoginRepository
    {
        void CreateUserLogin(UserLogin user);
        void DeleteUserLogin(UserLogin user);
        void DeleteByUserId(int userid);
        IEnumerable<UserLogin> GetAllUserLogins();
        // UserLogin GetUserByUserId(int userid);
        UserLogin GetUserLoginByUsername(string username);
        UserLogin GetUserLoginByUserId(int id);
        void UpdateUserLogin(UserLogin dbuser, UserLogin user);
    }
}