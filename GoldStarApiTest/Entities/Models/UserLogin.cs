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
        [StringLength(45, ErrorMessage = "Username can't be longer than 45 characters")]
        public string Username { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        [StringLength(45, ErrorMessage = "Password can't be longer than 45 characters")]
        public string Password { get; set; }
 
        [Required(ErrorMessage = "User ID is required!")]
        public int User_Id{ get; set; }

        [Required(ErrorMessage = "Active 0, Inactive 1")]
        public Boolean Active { get; set; }

    }
}