using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Entities.Models
{
    [Table("enrollment")]
    public class Enrollment
    {
        [Key]
        [Column("enrollment_id")]
        public int Enrollment_Id { get; set; }
        
        [Required(ErrorMessage = "Student Id is required")]
        [Range(1,999999, ErrorMessage = "Student id length must be between 1 and 6")]
        public int Student_Id { get; set; }
        
        [Required(ErrorMessage = "Section Id is required")]
        [Range(1,999999, ErrorMessage = "Section id length must be between 1 and 6")]
        public int Section_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Course_Status { get; set; }
        
        [Required(ErrorMessage = "Grade is required")]
        [Range(0,100, ErrorMessage = "Grade length must be between 0 and 100")]
        public double Grade { get; set; }
        
    }
}