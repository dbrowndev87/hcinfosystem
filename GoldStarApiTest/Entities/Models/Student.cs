/**
 * Name: Student
 * Description: This is a model class for a Student object. This class uses data annotations to map the class
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
        [Range(1,999999, ErrorMessage = "User id length must be between 1 and 6")]
        public int User_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [Range(0,999999, ErrorMessage = "Amount owing must be between 0 and 100000")]
        public double Amount_Owing { get; set; }
        
      
    }
}