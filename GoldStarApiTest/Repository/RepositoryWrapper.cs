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

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
    }
}