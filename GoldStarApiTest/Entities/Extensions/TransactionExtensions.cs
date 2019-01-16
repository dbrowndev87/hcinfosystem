using Entities.Models;

namespace Entities.Extensions
{
    public static class TransactionExtensions
    {
        public static void Map(this Transaction dbTransaction, Transaction transaction)
        {
            dbTransaction.Trans_Id = transaction.Trans_Id;
            dbTransaction.Trans_Amount = transaction.Trans_Amount;
            dbTransaction.Trans_Date = transaction.Trans_Date;
            dbTransaction.Student_Id = transaction.Student_Id;
        }
    }
}