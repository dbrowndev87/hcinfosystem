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