using Microsoft.EntityFrameworkCore;
using api.Database;
using api.Exceptions;
using api.Models.Database;

namespace api.Repositories;

public interface ITagsRepo
{
    Task<List<Tag>> GetAll();
    Task<Tag?> GetByName(string name);
    Task<IEnumerable<Book>?> GetBooks(int id);
    Task<Tag> Add(string name);
    void Delete(Tag tag);
}

public class TagsRepo(PrivateLibraryDbContext context) : ITagsRepo
{
    private readonly PrivateLibraryDbContext _context = context;

    public async Task<List<Tag>> GetAll()
    {
        return await _context.Tags.ToListAsync();
    }

    public async Task<Tag?> GetByName(string name)
    {
        return await _context.Tags.FirstOrDefaultAsync(t => t.Name == name);
    }

    public async Task<IEnumerable<Book>?> GetBooks(int id)
    {
        var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == id) ?? throw new NotFoundException($"No author with ID ${id} found");
        return tag.Books;
    }

    public async Task<Tag> Add(string name)
    {
        var tag = new Tag { Name = name };
        await _context.Tags.AddAsync(tag);
        await _context.SaveChangesAsync();
        return tag;
    }

    public void Delete(Tag tag)
    {
        _context.Remove(tag);
        _context.SaveChanges();
    }
}