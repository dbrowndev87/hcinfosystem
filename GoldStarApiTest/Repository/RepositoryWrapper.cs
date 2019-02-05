/**
 * Name: RepositoryWrapper
 * Description: This is a repository class that instantiates all of the IRepositoryWrapper objects. 
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryWrapper: IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private IUserRepository _user;
        private IUserLoginRepository _userlogin;
        private IStudentRepository _student;
        private IFacultyRepository _faculty;
        private ICourseRepository _course;
        private IDepartmentRepository _department;
        private ITransactionRepository _transaction;
        private IUserTypeCodeRepository _typecode;
        private IEnrollmentRepository _enrollment;
        private ISectionRepository _section;

        public IUserRepository Users
        {
            get {
                if(_user == null)
                {
                    _user= new UserRepository(_repoContext);
                }
 
                return _user;
            }
        }
        
        public ISectionRepository Section
        {
            get {
                if(_section == null)
                {
                    _section= new SectionRepository(_repoContext);
                }
 
                return _section;
            }
        }

        public IUserLoginRepository UserLogin
        {
            get
            {
                if (_userlogin == null)
                {
                    _userlogin = new UserLoginRepository(_repoContext);
                }

                return _userlogin;
            }
        }

        public IStudentRepository Student
        {
            get
            {
                if (_student == null)
                {
                    _student = new StudentRepository(_repoContext);
                }

                return _student;
            }
        }
        
        public IFacultyRepository Faculty
        {
            get
            {
                if (_faculty == null)
                {
                    _faculty = new FacultyRepository(_repoContext);
                }

                return _faculty;
            }
        }
        
        public IDepartmentRepository Department
        {
            get
            {
                if (_department == null)
                {
                    _department = new DepartmentRepository(_repoContext);
                }

                return _department;
            }
        }

        public ICourseRepository Course
        {
            get
            {
                if (_course == null)
                {
                    _course = new CourseRepository(_repoContext);
                }

                return _course;
            }
        }
        
        public ITransactionRepository Transaction
        {
            get
            {
                if (_transaction == null)
                {
                    _transaction = new TransactionRepository(_repoContext);
                }

                return _transaction;
            }
        }
        public IUserTypeCodeRepository TypeCode
        {
            get
            {
                if (_typecode == null)
                {
                    _typecode = new UserTypeCodeRepository(_repoContext);
                }

                return _typecode;
            }
        }
        
        public IEnrollmentRepository Enrollment
        {
            get
            {
                if (_enrollment == null)
                {
                    _enrollment = new EnrollmentRepository(_repoContext);
                }

                return _enrollment;
            }
        }

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
    }
}