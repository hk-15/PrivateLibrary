using PersonalLibrary.Models.Database;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface ICollectionsService
{
    Task<List<Collection>> GetAll();
    Task AddCollection(string name);
}

public class CollectionsService : ICollectionsService
{
    private readonly ICollectionsRepo _collectionsRepo;

    public CollectionsService(ICollectionsRepo collectionsRepo)
    {
        _collectionsRepo = collectionsRepo;
    }

    public async Task<List<Collection>> GetAll()
    {
        return await _collectionsRepo.GetAll();
    }

    public async Task AddCollection(string name)
    {
        var collection = await _collectionsRepo.GetCollectionByName(name);
        if (collection == null)
        {
            collection = new Collection
            {
                Name = name
            };
            await _collectionsRepo.Add(collection);
        }
    }
}