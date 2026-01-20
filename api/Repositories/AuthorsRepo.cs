using Microsoft.EntityFrameworkCore;
using api.Database;
using api.Exceptions;
using api.Models.Database;

namespace api.Repositories;

public interface IAuthorsRepo
{
    Task<Author?> GetByName(string name);
    Task<IEnumerable<Book>?> GetBooks(int id);
    Task<Author> Add(string name);
    void Delete(Author author);
}

public class AuthorsRepo(PrivateLibraryDbContext context) : IAuthorsRepo
{
    private readonly PrivateLibraryDbContext _context = context;

    public async Task<Author?> GetByName(string name)
    {
        return await _context.Authors.FirstOrDefaultAsync(a => a.Name == name);
    }

    public async Task<IEnumerable<Book>?> GetBooks(int id)
    {
        var author = await _context.Authors.Include(a => a.Books).FirstOrDefaultAsync(a => a.Id == id) ?? throw new NotFoundException($"No author with ID ${id} found");
        return author.Books;
    }

    public async Task<Author> Add(string name)
    {
        var author = new Author
        {
            Name = name
        };
        await _context.AddAsync(author);
        await _context.SaveChangesAsync();
        return author;
    }

    public void Delete(Author author)
    {
        _context.Remove(author);
        _context.SaveChanges();
    }
}