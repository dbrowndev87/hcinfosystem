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
        Student GetTransactionById(int transactionId);
        string ToString();
        void UpdateTransaction(Transaction dbStudent, Transaction transaction);
    }
}