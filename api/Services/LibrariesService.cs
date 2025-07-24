using PersonalLibrary.Models.Database;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface ILibrariesService
{
    Task<List<Library>> GetAll();
    Task Add(string name);
}

public class LibrariesService : ILibrariesService
{
    private readonly ILibrariesRepo _librariesRepo;

    public LibrariesService(ILibrariesRepo librariesRepo)
    {
        _librariesRepo = librariesRepo;
    }

    public async Task<List<Library>> GetAll()
    {
        return await _librariesRepo.GetAll();
    }

    public async Task Add(string name)
    {
        var library = await _librariesRepo.GetByName(name);
        if (library == null)
        {
            library = new Library
            {
                Name = name
            };
            await _librariesRepo.Add(library);
        }
    }
}