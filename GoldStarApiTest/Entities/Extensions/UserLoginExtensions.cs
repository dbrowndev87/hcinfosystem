using Entities.Models;

namespace Entities.Extensions
{
    public static class UserLoginExtensions
    {
        public static void Map(this UserLogin dbUserLogin, UserLogin userLogin)
        {
            dbUserLogin.Username = userLogin.Username;
            dbUserLogin.Password = userLogin.Password;
            dbUserLogin.User_Id = userLogin.User_Id;
            dbUserLogin.Active = userLogin.Active;
        }
    }
}