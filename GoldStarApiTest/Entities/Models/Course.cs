using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    
    [Table("course")]
    public class Course
    {
        [Key]
        [Column("course_id")]
        public string Course_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Course_Name { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public int Dept_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public int Credits { get; set; }
    }
}