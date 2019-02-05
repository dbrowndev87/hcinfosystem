/**
 * Name: RepositoryBase
 * Description: This is a repository class that will call all of the IRepositoryBase methods. In all of its methods that will
 *         be implemented by all repositories, it will return a db set of whatever class type that is passed to it. 
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Contracts;
using Entities;
using System.Linq;


namespace Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private RepositoryContext RepositoryContext { get; }

        protected RepositoryBase(RepositoryContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }
 
        public IEnumerable<T> FindAll()
        {
            return RepositoryContext.Set<T>();
        }
 
        public IEnumerable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return RepositoryContext.Set<T>().Where(expression);
        }
 
        public void Create(T entity)
        {
            RepositoryContext.Set<T>().Add(entity);
        }
 
        public void Update(T entity)
        {
            RepositoryContext.Set<T>().Update(entity);
        }
 
        public void Delete(T entity)
        {
            RepositoryContext.Set<T>().Remove(entity);
        }
 
        public void Save()
        {
            RepositoryContext.SaveChanges();
        }
    }
}