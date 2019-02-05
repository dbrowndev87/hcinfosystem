/**
 * Name: UserTypeCodeExtension
 * Description: This is a extension class that will create the map method that will be called when updating userTypeCode objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Entities.Models;

namespace Entities.Extensions
{
    public static class UserTypeCodeExtensions
    {
        public static void Map(this UserTypeCode dbTypeCode, UserTypeCode typeCode)
        {
            dbTypeCode.Type_Code = typeCode.Type_Code;
            dbTypeCode.User_Description = typeCode.User_Description;
         
        }
    }
}