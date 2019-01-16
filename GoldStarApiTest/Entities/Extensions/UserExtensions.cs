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
            dbuser.First_Name = user.First_Name;
            dbuser.Birth_date = user.Birth_date;
            
        }
    }
}