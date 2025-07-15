using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Database;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Repositories;

public interface IBooksRepo
{
    Task<List<Book>> GetAll();
    void Add(Book book);
}

public class BooksRepo : IBooksRepo
{
    private readonly PersonalLibraryDbContext _context;

    public BooksRepo(PersonalLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<List<Book>> GetAll()
    {
        return await _context.Books
            .Include(b => b.Author)
            .Include(b => b.Collection)
            .ToListAsync();
    }

    public async void Add(Book book)
    {
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
    }
}
