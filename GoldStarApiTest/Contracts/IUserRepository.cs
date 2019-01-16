using System.Collections.Generic;
using Entities.Models;

namespace Repository
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