/**
 * Name: ITransactionRepository
 * Description: This is an interface to be implemented by all Transaction Repositories, containing typical CRUD methods
 *     for database interaction
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface ITransactionRepository
    {
        void CreateTransaction(Transaction transaction);
        void DeleteTransaction(Transaction transaction);
        bool Equals(object obj);
        IEnumerable<Transaction> GetAllTransactions();
        int GetHashCode();
        Transaction GetTransactionById(int transactionId);
        string ToString();
        void UpdateTransaction(Transaction dbStudent, Transaction transaction);
    }
}