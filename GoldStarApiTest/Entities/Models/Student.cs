using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("student")]
    public class Student
    {
      
        [Key]
        [Column("student_id")]
        public int Student_Id { get; set; }
 
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Student_Status { get; set; }
        
        [Required(ErrorMessage = "GPA is required")]
        [Range(0,100, ErrorMessage = "GPA must be between 0 and 100")]
        public double Gpa { get; set; }
 
        [Required(ErrorMessage = "User Id is required")]
        [Range(1,6, ErrorMessage = "User id length must be between 1 and 6")]
        public int User_id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [Range(0,999999, ErrorMessage = "Amount owing must be between 0 and 100000")]
        public double Amount_Owing { get; set; }
        
      
    }
}