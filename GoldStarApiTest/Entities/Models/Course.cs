/**
 * Name: Course
 * Description: This is a model class for a Course object. This class uses data annotations to map the class
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
    
    [Table("course")]
    public class Course
    {
        [Key]
        [Column("course_id")]
        public string Course_Id { get; set; }
        
        [Required(ErrorMessage = "Course Name is required")]
        [StringLength(140, ErrorMessage = "Course Name must be less than 140 Character")]
        public string Course_Name { get; set; }
        
        [Required(ErrorMessage = "Dept id is required")]
        [Range(1,999999, ErrorMessage = "Dept id length must be between 1 and 6")]
        public int Dept_Id { get; set; }
        
        [Required(ErrorMessage = "Credits is required")]
        [Range(1,999999, ErrorMessage = "Credits length must be between 1 and 99")]
        public int Credits { get; set; }
    }
}