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
    }
}
