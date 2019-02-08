/**
 * Name: User
 * Description: This is a model class for a User object. This class uses data annotations to map the class
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
    [Table("user")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public int User_Id { get; set; }
 
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(50, ErrorMessage = "First Name can't be longer than 20 characters")]
        public string First_Name { get; set; }
        
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(50, ErrorMessage = "Last Name can't be longer than 30 characters")]
        public string Last_Name { get; set; }

        [Required(ErrorMessage = "E-Mail is required")]
        [StringLength(50, ErrorMessage = "E-Mail can't be longer than 50 characters")]
        public string EMail { get; set; }

        [Required(ErrorMessage = "Birth Date is required")]
        [DataType(DataType.DateTime)]
        public DateTime Birth_Date { get; set; }
        
        [Required(ErrorMessage = "Type Code is required")]
        [Range(1,9,ErrorMessage = "Type Code must be 1 and 9")]
        public int Type_Code { get; set; }
        
        [Range(1,999999,ErrorMessage = "Dept Id must be 1 and 9")]
        public int Dept_Id { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [StringLength(140, ErrorMessage = "Address can't be longer than 140 characters")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Start Date is required")]
        public DateTime Start_Date { get; set; }
    }
}