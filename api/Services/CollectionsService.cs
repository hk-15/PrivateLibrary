using api.Exceptions;
using api.Models.Database;
using api.Repositories;
using Microsoft.AspNetCore.Identity;

namespace api.Services;

public interface ICollectionsService
{
    Task<List<Collection>> GetByUser(string user);
    Task Add(string name, string user);
    Task Delete(string name, string user);
}

public class CollectionsService(ICollectionsRepo collectionsRepo, IBooksService booksService) : ICollectionsService
{
    private readonly ICollectionsRepo _collectionsRepo = collectionsRepo;
    private readonly IBooksService _booksService = booksService;

    public async Task<List<Collection>> GetByUser(string user)
    {
        return await _collectionsRepo.GetByUser(user);
    }

    public async Task Add(string name, string user)
    {
        var collection = await _collectionsRepo.GetByName(name);
        if (collection == null)
        {
            collection = new Collection
            {
                Name = name,
                Users = [user]
            };
            await _collectionsRepo.Add(collection);
        }
        else
        {
            collection.Users.Add(user);
            await _collectionsRepo.Update(collection);
        }
    }

    public async Task Delete(string name, string user)
    {
        var collection = await _collectionsRepo.GetByName(name) ?? throw new NotFoundException("Collection not found");
        var books = await _booksService.GetByCollection(collection);
        var userBooks = books.Where(b => b.User?.UserName == user).ToList();
        if (userBooks.Count != 0)
        {
            throw new Exception("Cannot delete a collection that contains books");
        }
        if (collection.Users.Count == 1)
        {
            _collectionsRepo.Delete(collection);
        }
        else
        {
            collection.Users.Remove(user);
            await _collectionsRepo.Update(collection);
        }
    }
}