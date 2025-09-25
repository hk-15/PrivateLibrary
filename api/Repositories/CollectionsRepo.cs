using Microsoft.EntityFrameworkCore;
using api.Database;
using api.Models.Database;
using Microsoft.AspNetCore.Identity;

namespace api.Repositories;

public interface ICollectionsRepo
{
    Task<List<Collection>> GetByUser(string user);
    Task<Collection?> GetByName(string name);
    Task Add(Collection collection);
    Task Update(Collection collection);
    void Delete(Collection collection);
}

public class CollectionsRepo : ICollectionsRepo
{
    private readonly PrivateLibraryDbContext _context;

    public CollectionsRepo(PrivateLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<List<Collection>> GetByUser(string user)
    {
        return await _context.Collections
            .Where(c => c.Users.Contains(user))
            .ToListAsync();
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

    public async Task Update(Collection collection)
    {
        _context.Update(collection);
        await _context.SaveChangesAsync();
    }

    public void Delete(Collection collection)
    {
        _context.Remove(collection);
        _context.SaveChanges();
    }
}