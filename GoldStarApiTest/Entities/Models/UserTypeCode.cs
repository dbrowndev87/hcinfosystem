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