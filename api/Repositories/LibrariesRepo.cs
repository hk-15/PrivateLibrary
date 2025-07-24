using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Database;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Repositories;

public interface ILibrariesRepo
{
    Task<List<Library>> GetAll();
    Task<Library?> GetByName(string name);
    Task Add(Library library);
}

public class LibrariesRepo : ILibrariesRepo
{
    private readonly PersonalLibraryDbContext _context;

    public LibrariesRepo(PersonalLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<List<Library>> GetAll()
    {
        return await _context.Libraries.ToListAsync();
    }

    public async Task<Library?> GetByName(string name)
    {
        return await _context.Libraries.FirstOrDefaultAsync(l => l.Name == name);
    }

    public async Task Add(Library library)
    {
        await _context.Libraries.AddAsync(library);
        await _context.SaveChangesAsync();
    }
}