using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Database;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Repositories;

public interface ICollectionsRepo
{
    Task<Collection?> GetCollectionByName(string name);
    void Add(Collection collection);
}

public class CollectionsRepo : ICollectionsRepo
{
    private readonly PersonalLibraryDbContext _context;

    public CollectionsRepo(PersonalLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<Collection?> GetCollectionByName(string name)
    {
        return await _context.Collections.FirstOrDefaultAsync(c => c.Name == name);
    }

    public async void Add(Collection collection)
    {
        await _context.Collections.AddAsync(collection);
        await _context.SaveChangesAsync();
    }
}