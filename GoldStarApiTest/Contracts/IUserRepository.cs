/**
 * Name: IUserRepository
 * Description: This is an interface to be implemented by all User Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IUserRepository
    {
        void CreateUser(User user);
        void DeleteUser(User user);
        bool Equals(object obj);
        IEnumerable<User> GetAllUsers();
        IEnumerable<User> GetLastId();
        int GetHashCode();
        User GetUserById(int userid);
        string ToString();
        void UpdateUser(User dbuser, User user);
    }
}