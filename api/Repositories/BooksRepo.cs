using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Database;
using PersonalLibrary.Models.Database;
using PersonalLibrary.Exceptions;

namespace PersonalLibrary.Repositories;

public interface IBooksRepo
{
    Task<List<Book>> GetAll();
    Task<Book> Get(string isbn);
    Task Add(Book book);
    Task Update(Book book);
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

    public async Task<Book> Get(string isbn)
    {
        var book = await _context.Books
            .FirstOrDefaultAsync(b => b.Id == isbn) ?? throw new NotFoundException($"Book with {isbn} not found.");
        return book;
    }

    public async Task Add(Book book)
    {
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Book book)
    {
        _context.Update(book);
        await _context.SaveChangesAsync();
    }
}
