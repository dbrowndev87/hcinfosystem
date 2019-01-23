using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public int User_Id { get; set; }
 
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(20, ErrorMessage = "First Name can't be longer than 20 characters")]
        public string First_Name { get; set; }
        
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(30, ErrorMessage = "Last Name can't be longer than 30 characters")]
        public string Last_Name { get; set; }

        [Required(ErrorMessage = "E-Mail is required")]
        [StringLength(50, ErrorMessage = "E-Mail can't be longer than 50 characters")]
        public string EMail { get; set; }

        [Required(ErrorMessage = "Birth Date is required")]
        public DateTime Birth_date { get; set; }
        
        [Required(ErrorMessage = "Type Code is required")]
        public int Type_Code { get; set; }
        
        [Required(ErrorMessage = "Type Code is required")]
        public int Dept_Id { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [StringLength(140, ErrorMessage = "Address can't be longer than 140 characters")]
        public string Address { get; set; }

    }
}