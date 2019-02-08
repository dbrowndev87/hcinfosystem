/**
 * Name: UserExtension
 * Description: This is a extension class that will create the map method that will be called when updating user objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Entities.Models;

namespace Entities.Extensions
{
    public static class UserExtensions
    {
        public static void Map(this User dbuser, User user)
        {
            dbuser.User_Id = user.User_Id;
            dbuser.Last_Name = user.Last_Name;
            dbuser.EMail = user.EMail;
            dbuser.Type_Code = user.Type_Code;
            dbuser.Address = user.Address;
            dbuser.Dept_Id = user.Dept_Id;
            dbuser.First_Name = user.First_Name;
            dbuser.Birth_Date = user.Birth_Date;
            dbuser.Start_Date = user.Start_Date;

        }
    }
}