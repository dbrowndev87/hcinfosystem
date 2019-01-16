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
            public double Trans_Amount { get; set; }
            
            [Required(ErrorMessage = "Birth Date is required")]
            public DateTime Trans_Date { get; set; }
            
            [Required(ErrorMessage = "Student Id is required")]
            public int Student_Id { get; set; }
        
        
    }
}