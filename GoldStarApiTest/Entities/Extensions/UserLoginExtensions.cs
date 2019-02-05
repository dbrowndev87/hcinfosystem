/**
 * Name: UserLoginExtension
 * Description: This is a extension class that will create the map method that will be called when updating userLogin objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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