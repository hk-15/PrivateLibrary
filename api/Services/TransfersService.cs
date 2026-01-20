using api.Models.Database;
using api.Models.Response;
using api.Repositories;
using Microsoft.AspNetCore.Identity;

namespace api.Services;

public interface ITransfersService
{
    Task<List<TransferResponse>> GetByUser(string userId);
    Task Add(List<int> bookIds, string userId, string newUserId);
    Task Accept(int id, string collectionName, IdentityUser newUser);
    Task Reject(int id, string message);
    Task Delete(int id);
}

public class TransfersService(ITransfersRepo transfersRepo, IBooksRepo booksRepo, ICollectionsRepo collectionsRepo, IBooksService booksService) : ITransfersService
{
    private readonly ITransfersRepo _transfersRepo = transfersRepo;
    private readonly IBooksRepo _booksRepo = booksRepo;
    private readonly ICollectionsRepo _collectionsRepo = collectionsRepo;
    private readonly IBooksService _booksService = booksService;

    public async Task<List<TransferResponse>> GetByUser(string userId)
    {
        var transfers = await _transfersRepo.GetByUser(userId);
        return [..transfers.Select(t => new TransferResponse
        {
            Id = t.Id,
            Isbn = t.Book.Isbn,
            BookTitle = t.Book.Title,
            Author = GetAuthorNames(t.Book.Authors),
            TransferFrom = t.User.UserName ?? "",
            TransferTo = t.NewUser.UserName ?? "",
            RejectedMessage = t.RejectedMessage
        })];
    }

    public async Task Add(List<int> bookIds, string userId, string newUserId)
    {
        var transfers = new List<Transfer>();
        foreach (var bookId in bookIds)
        {
            var transfer = new Transfer
            {
                BookId = bookId,
                UserId = userId,
                NewUserId = newUserId
            };
            transfers.Add(transfer);
            await _booksService.UpdateTransferStatus(bookId);
        }
        await _transfersRepo.Add(transfers);
    }

    public async Task Accept(int id, string collectionName, IdentityUser newUser)
    {
        var transfer = await _transfersRepo.Get(id);
        var collection = await _collectionsRepo.GetByName(collectionName);
        if (collection == null)
        {
            collection = new Collection
            {
                Name = collectionName,
                Users = [newUser.UserName!]
            };
            await _collectionsRepo.Add(collection);
        }
        var book = transfer.Book;
        book.UserId = transfer.NewUserId;
        book.Read = false;
        book.Notes = "";
        book.Tags = [];
        book.CollectionId = collection.Id;
        book.TransferPending = false;
        await _booksRepo.Update(book);
        _transfersRepo.Delete(transfer);
    }

    public async Task Reject(int id, string message)
    {
        var transfer = await _transfersRepo.Get(id);
        transfer.RejectedMessage = message;
        await _transfersRepo.Update(transfer);
    }

    public async Task Delete(int id)
    {
        var transfer = await _transfersRepo.Get(id);
        var book = transfer.Book;
        book.TransferPending = false;
        await _booksRepo.Update(book);
        _transfersRepo.Delete(transfer);
    }

    private static List<string> GetAuthorNames(List<Author> authorsList)
    {
        if (authorsList.Count < 1) return [];
        var authorNames = new List<string>();
        foreach (var author in authorsList)
        {
            authorNames.Add(author.Name);
        }
        return authorNames;
    }
}