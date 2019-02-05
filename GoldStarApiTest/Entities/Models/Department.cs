/**
 * Name: Department
 * Description: This is a model class for a Department object. This class uses data annotations to map the class
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