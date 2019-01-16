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
 
        [Required(ErrorMessage = "Birth Date is required")]
        public string Student_Status { get; set; }
        
        [Required(ErrorMessage = "E-Mail is required")]
        [StringLength(50, ErrorMessage = "E-Mail can't be longer than 50 characters")]
        public double Gpa { get; set; }
 
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public int User_id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public double Amount_Owing { get; set; }
        
      
    }
}