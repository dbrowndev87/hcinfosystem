using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("user_login")]
    public class UserLogin
    { 
        [Key]
        [Required(ErrorMessage = "Username is required")]
        [StringLength(20, ErrorMessage = "Username can't be longer than 12 characters")]
        public string Username { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        [StringLength(50, ErrorMessage = "Password can't be longer than 50 characters")]
        public string Password { get; set; }
 
        [Required(ErrorMessage = "User ID is required!")]
        [Range(1,999999,ErrorMessage = "User Id must be 1 and 6")]
        public int User_Id{ get; set; }

        [Required(ErrorMessage = "Active 0, Inactive 1")]
        public Boolean Active { get; set; }

    }
}