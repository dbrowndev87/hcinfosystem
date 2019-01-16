using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    
    [Table("faculty")]
    public class Faculty
    {
        [Key]
        [Column("faculty_id")]
        public int Faculty_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Faculty_Status { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public int User_Id { get; set; }
    }
}