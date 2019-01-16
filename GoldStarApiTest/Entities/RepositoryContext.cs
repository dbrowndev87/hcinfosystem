using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class RepositoryContext: DbContext
    {
        public RepositoryContext(DbContextOptions options)
            :base(options)
        {
        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Faculty> Faculty { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<UserTypeCode> UserTypeCodes { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Section> Sections { get; set; }
        
   
    }
}