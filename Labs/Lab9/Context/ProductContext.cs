namespace Lab9.Context
{
    using Microsoft.EntityFrameworkCore;
    public class ProductContext : DbContext
    {
        public DbSet<Models.Product> Products { get; set; }

        public DbSet<Models.User> Users { get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=Lab9Web;Trusted_Connection=True;");
        }
    }
}
