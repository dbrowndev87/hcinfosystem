/**
 * Name: IUserLoginRepository
 * Description: This is an interface to be implemented by all UserLogin Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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