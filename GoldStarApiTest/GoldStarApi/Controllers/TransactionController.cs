using System;
using System.Linq;
using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace GoldStarApi.Controllers
{
    [Route("api/transaction")]
    public class TransactionController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        
        public TransactionController(ILoggerManager logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAllTransations()
        {
            try
            {
                var transactions = _repository.Transaction.GetAllTransactions();
               
 
                _logger.LogInfo($"Returned all transactions from database. " + transactions);
                
 
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetAllTransactions action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name ="TransactionById")]
        public IActionResult GetTransactionById(int id)
        {
            
            try
            {
                // Get user ID Modified to return the Last id when 0 is sent.
                    var transaction = _repository.Transaction.GetTransactionById(id);

                    if (transaction.Equals(null))
                    {
                        _logger.LogError($"Transaction with id: {id}, hasn't been found in db.");
                        return NotFound();
                    }
                    else
                    {
                        _logger.LogInfo($"Returned Transaction with id: {id}");
                        return Ok(transaction);
                    }
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetTransactionById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        public IActionResult CreateTransaction([FromBody]Transaction transaction)
        {
            try
            {
                if(transaction.Equals(null))
                {
                    _logger.LogError("Transaction object sent from client is null.");
                    return BadRequest("Transaction object is null");
                }
 
                if(!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Transaction object sent from client.");
                    return BadRequest("Invalid model object");
                }
                
                _repository.Transaction.CreateTransaction(transaction);

                return Ok(transaction);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateTransaction action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{id}")]
        public IActionResult UpdateTransaction(int id, [FromBody]Transaction transaction)
        {
            try
            {
                if (transaction.Equals(null))
                {
                    _logger.LogError("Transaction object sent from client is null.");
                    return BadRequest("Transaction object is null");
                }
 
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid Transaction object sent from client.");
                    return BadRequest("Invalid model object");
                }
 
                var dbTransaction = _repository.Transaction.GetTransactionById(id);
                if (dbTransaction.Equals(null))
                {
                    _logger.LogError($"Transaction with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
 
                _repository.Transaction.UpdateTransaction(dbTransaction, transaction);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateTransaction action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            try
            {
                var transaction = _repository.Transaction.GetTransactionById(id);
                if(transaction.Equals(null))
                {
                    _logger.LogError($"Transaction with id: {id}, hasn't been found in db.");
                    return NotFound();
                }
              
                _repository.Transaction.DeleteTransaction(transaction);
 
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteTransaction action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

     
    }
}