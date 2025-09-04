using Microsoft.EntityFrameworkCore;
using api.Database;
using api.Models.Database;
using api.Exceptions;

namespace api.Repositories;

public interface IBooksRepo
{
    Task<List<Book>> GetAll();
    Task<List<Book>> GetByUserId(string userId);
    Task<List<Book>> GetByCollectionId(int collectionId);
    Task<Book> Get(int id);
    Task<List<Book>> GetMany(List<int> ids);
    Task Add(Book book);
    Task Update(Book book);
    Task UpdateMany(List<Book> books);
    void Delete(Book book);
}

public class BooksRepo : IBooksRepo
{
    private readonly PrivateLibraryDbContext _context;

    public BooksRepo(PrivateLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<List<Book>> GetAll()
    {
        return await _context.Books
            .Include(b => b.Authors)
            .Include(b => b.Tags)
            .Include(b => b.Collection)
            .Include(b => b.User)
            .ToListAsync();
    }

    public async Task<List<Book>> GetByUserId(string userId)
    {
        var books = await _context.Books
            .Include(b => b.Authors)
            .Include(b => b.Tags)
            .Include(b => b.Collection)
            .Include(b => b.User)
            .Where(b => b.UserId == userId)
            .ToListAsync();
        if (books.Count == 0)
        {
            throw new NotFoundException("No books found for the current user");
        }
        return books;
    }

    public async Task<List<Book>> GetByCollectionId(int collectionId)
    {
        return await _context.Books
            .Where(b => b.CollectionId == collectionId)
            .ToListAsync();
    }

    public async Task<Book> Get(int id)
    {
        return await _context.Books
            .Include(b => b.Authors)
            .Include(b => b.Tags)
            .FirstOrDefaultAsync(b => b.Id == id) ?? throw new NotFoundException("Book not found");
    }

    public async Task<List<Book>> GetMany(List<int> ids)
    {
        var books = await _context.Books
            .Include(b => b.Authors)
            .Include(b => b.Tags)
            .Where(b => ids.Contains(b.Id))
            .ToListAsync();
        if (books.Count == 0) throw new NotFoundException("No books found");
        return books;
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

    public async Task UpdateMany(List<Book> books)
    {
        _context.UpdateRange(books);
        await _context.SaveChangesAsync();
    }

    public void Delete(Book book)
    {
        _context.Remove(book);
        _context.SaveChanges();
    }
}
