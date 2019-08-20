using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTask.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        public DbSet<Response> Responses { get; set; }
        
    }
}