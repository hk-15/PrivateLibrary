using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Database;

public class PersonalLibraryDbContext : IdentityDbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<Collection> Collections { get; set; }
    public DbSet<Tag> Tags { get; set; }
    private readonly IConfiguration _configuration;

    public PersonalLibraryDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration["ConnectionStrings:PersonalLibraryDb"]);
    }
}