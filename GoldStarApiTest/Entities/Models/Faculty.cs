/**
 * Name: Faculty
 * Description: This is a model class for a Faculty object. This class uses data annotations to map the class
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
    
    [Table("faculty")]
    public class Faculty
    {
        [Key]
        [Column("faculty_id")]
        public int Faculty_Id { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [StringLength(20, ErrorMessage = "Status can't be longer than 20 characters")]
        public string Faculty_Status { get; set; }
        
        [Required(ErrorMessage = "User ID is required")]
        [Range(1,999999, ErrorMessage = "User id length must be between 1 and 6")]
        public int User_Id { get; set; }
    }
}