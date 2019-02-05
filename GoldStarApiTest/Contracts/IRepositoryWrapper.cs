/**
 * Name: IRepositoryWrapper
 * Description: This is an interface that will hold all of the different types of interfaces to be used in the system.
 *         It will essentially instantiate every type of repository interface by simply by simply instantiating this wrapper
 *         interface class.
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Repository;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
       
        IUserRepository Users { get; }
        IUserLoginRepository UserLogin { get; }
        IStudentRepository Student { get; }
        
        IFacultyRepository Faculty { get; }
        ICourseRepository Course { get; }
        
        IDepartmentRepository Department { get; }
        ITransactionRepository Transaction { get; }
        IUserTypeCodeRepository TypeCode { get; }
        IEnrollmentRepository Enrollment { get; }
        ISectionRepository Section { get; }
    }
}
