/**
 * Name: Section
 * Description: This is a model class for a Section object. This class uses data annotations to map the class
 *         to a database table and attributes to database columns. It also uses the required, stringLength, and range
 *         annotations for validation before inserting into the database. Theses annotations will match those restraints
 *         from the Database.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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
 
        [Required(ErrorMessage = "Faculty Id is required")]
        [Range(1,999999, ErrorMessage = "Faculty Id length must be between 1 and 6")]
        public int Faculty_Id { get; set; }
        
        [Required(ErrorMessage = "Semester is required")]
        [StringLength(10, ErrorMessage = "Semester length must be less than 10")]
        public string Semester { get; set; }
        
        [Required(ErrorMessage = "Status is required")]
        [Range(0,999999, ErrorMessage = "Vacancy length must be between 0 and 1000")]
        public int Vacancy { get; set; }
        
        [Required(ErrorMessage = "Course Id is required")]
        [StringLength(12, ErrorMessage = "Semester length must be less than 12")]
        public string Course_Id { get; set; }
 
        [Required(ErrorMessage = "Start Date is required")]
        [DataType(DataType.DateTime)]
        public DateTime Start_Date { get; set; }
        
        [Required(ErrorMessage = "End Date is required")]
        [DataType(DataType.DateTime)]
        public DateTime End_Date { get; set; }
        
        [Required(ErrorMessage = "Designation is required")]
        [StringLength(1, ErrorMessage = "Designation must be one character")]
        public string Designation { get; set; }
        
      
    }
}