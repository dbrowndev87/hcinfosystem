/**
 * Name: IRepositoryBase
 * Description: This is an interface to be implemented by all Repositories, containing direct CRUD methods
 *     for database interaction. These will be called to create select, where, update, delete sql
 *     commands directly to the database. This class uses the generic type T to allow any type of object to be used.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Contracts
{
    public interface IRepositoryBase<T>
    {
        IEnumerable<T> FindAll();
        IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Save();
    }
}