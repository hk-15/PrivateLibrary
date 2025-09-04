using Microsoft.EntityFrameworkCore;
using api.Database;
using api.Models.Database;

namespace api.Repositories;

public interface ICollectionsRepo
{
    Task<List<Collection>> GetAll();
    Task<Collection?> GetByName(string name);
    Task Add(Collection collection);
    void Delete(Collection collection);
}

public class CollectionsRepo : ICollectionsRepo
{
    private readonly PrivateLibraryDbContext _context;

    public CollectionsRepo(PrivateLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<List<Collection>> GetAll()
    {
        return await _context.Collections.ToListAsync();
    }

    public async Task<Collection?> GetByName(string name)
    {
        return await _context.Collections.FirstOrDefaultAsync(c => c.Name == name);
    }

    public async Task Add(Collection collection)
    {
        await _context.Collections.AddAsync(collection);
        await _context.SaveChangesAsync();
    }

    public void Delete(Collection collection)
    {
        _context.Remove(collection);
        _context.SaveChanges();
    }
}