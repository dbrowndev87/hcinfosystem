/**
 * Name: UserTypeCode
 * Description: This is a model class for a UserTypeCode object. This class uses data annotations to map the class
 *         to a database table and attributes to database columns. It also uses the required, stringLength, and range
 *         annotations for validation before inserting into the database. Theses annotations will match those restraints
 *         from the Database.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("user_type_code")]
    public class UserTypeCode
    {
      
        [Key]
        [Required(ErrorMessage = "Type Code is required")]
        public int Type_Code{ get; set; }
        
        [Required(ErrorMessage = "User description is required")]
        [StringLength(20, ErrorMessage = "User Description can't be longer than 20 characters")]
        public string User_Description { get; set; }
 
    }
}