using PersonalLibrary.Models.Database;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface ICollectionsService
{
    void AddCollection(string name);
}

public class CollectionsService : ICollectionsService
{
    private readonly ICollectionsRepo _collectionsRepo;

    public CollectionsService(ICollectionsRepo collectionsRepo)
    {
        _collectionsRepo = collectionsRepo;
    }

    public async void AddCollection(string name)
    {
        var collection = await _collectionsRepo.GetCollectionByName(name);
        if (collection == null)
        {
            collection = new Collection
            {
                Name = name
            };
            _collectionsRepo.Add(collection);
        }
        throw new Exception();
    }
}