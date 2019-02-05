/**
 * Name: Transaction
 * Description: This is a model class for a Transaction object. This class uses data annotations to map the class
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
    [Table("transaction")]
    public class Transaction
    {
            [Key]
            [Column("trans_id")]
            public int Trans_Id { get; set; }
        
            [Required(ErrorMessage = "Transaction Amount is required")]
            [Range(0,999999, ErrorMessage = "Trans Amount length must be less than 999999")]
            public double Trans_Amount { get; set; }
            
            [Required(ErrorMessage = "Birth Date is required")]
            [DataType(DataType.DateTime)]
            public DateTime Trans_Date { get; set; }
            
            [Required(ErrorMessage = "Student Id is required")]
            [Range(1,999999, ErrorMessage = "Student Id must be between 1 and 6")]
            public int Student_Id { get; set; }
        
        
    }
}