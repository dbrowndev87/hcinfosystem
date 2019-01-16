using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Entities.Extensions;

namespace Repository
{
    public class TransactionRepository : RepositoryBase<Transaction>, ITransactionRepository
    {
        public TransactionRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<Transaction> GetAllTransactions()
        {
            return FindAll()
                .OrderBy(ow => ow.Trans_Id);
        }

        public Transaction GetTransactionById(int transId)
        {
            return FindByCondition(transaction => transaction.Trans_Id.Equals(transId))
                .DefaultIfEmpty(new Transaction())
                .FirstOrDefault();
        }

        public void CreateTransaction(Transaction transaction)
        {
            Create(transaction);
            Save();
        }

        public void UpdateTransaction(Transaction dbTransaction, Transaction transaction)
        {
            dbTransaction.Map(transaction);
            Update(transaction);
            Save();
        }

        public void DeleteTransaction(Transaction transaction)
        {
            Delete(transaction);
            Save();
        }
    }
}