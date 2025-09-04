using api.Exceptions;
using api.Models.Database;
using api.Repositories;

namespace api.Services;

public interface ICollectionsService
{
    Task<List<Collection>> GetAll();
    Task Add(string name);
    Task Delete(string name);
}

public class CollectionsService : ICollectionsService
{
    private readonly ICollectionsRepo _collectionsRepo;
    private readonly IBooksService _booksService;

    public CollectionsService(ICollectionsRepo collectionsRepo, IBooksService booksService)
    {
        _collectionsRepo = collectionsRepo;
        _booksService = booksService;
    }

    public async Task<List<Collection>> GetAll()
    {
        return await _collectionsRepo.GetAll();
    }

    public async Task Add(string name)
    {
        var collection = await _collectionsRepo.GetByName(name);
        if (collection == null)
        {
            collection = new Collection
            {
                Name = name
            };
            await _collectionsRepo.Add(collection);
        }
    }

    public async Task Delete(string name)
    {
        var collection = await _collectionsRepo.GetByName(name) ?? throw new NotFoundException("Collection not found");
        var books = await _booksService.GetByCollection(collection);
        if (books.Count != 0)
        {
            throw new Exception("Cannot delete a collection that contains books");
        }
        _collectionsRepo.Delete(collection);
    }
}