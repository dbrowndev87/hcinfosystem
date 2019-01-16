using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("section")]
    public class Section
    {
      
        [Key]
        [Column("section_id")]
        public int Section_Id { get; set; }
 
        [Required(ErrorMessage = "Status is required")]
        public int Faculty_id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public string Semester { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public int Vacancy { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public string Course_id { get; set; }
 
        [Required(ErrorMessage = "Status is required")]
        public DateTime Start_Date { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public DateTime End_Date { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        public string Designation { get; set; }
        
      
    }
}