using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Database;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Repositories;

public interface IAuthorsRepo
{
    Task<Author?> GetAuthorByName(string name);
    Task AddAuthor(string name);
}

public class AuthorsRepo : IAuthorsRepo
{
    private readonly PersonalLibraryDbContext _context;

    public AuthorsRepo(PersonalLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<Author?> GetAuthorByName(string name)
    {
        return await _context.Authors.FirstOrDefaultAsync(a => a.Name == name);
    }

    public async Task AddAuthor(string name)
    {
        var author = new Author
        {
            Name = name
        };
        await _context.AddAsync(author);
        await _context.SaveChangesAsync();
    }
}