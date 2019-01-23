using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    
    [Table("department")]
    public class Department
    {
        [Key]
        [Column("dept_id")]
        public int Dept_Id { get; set; }
        
        [Required(ErrorMessage = "Dept name is required")]
        [StringLength(140, ErrorMessage = "Department Name can't be longer than 140 characters")]
        public string Dept_Name { get; set; }
        
    }
}