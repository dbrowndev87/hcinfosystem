/**
 * Name: TransactionExtension
 * Description: This is a extension class that will create the map method that will be called when updating transaction objects
 *         in the database. It will get the object from the db and the object from the front end and change the db
 *         object accordingly.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
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