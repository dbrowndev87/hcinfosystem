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
        
        [Required(ErrorMessage = "Status is required")]
        public int Student_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public int Section_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Course_Status { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public double Grade { get; set; }
        
    }
}