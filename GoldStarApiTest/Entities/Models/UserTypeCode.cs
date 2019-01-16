using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("user_type_code")]
    public class UserTypeCode
    {
      
        [Key]
        [Required(ErrorMessage = "Username is required")]
        public int Type_Code{ get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        [StringLength(140, ErrorMessage = "Password can't be longer than 45 characters")]
        public string User_Description { get; set; }
 
    }
}