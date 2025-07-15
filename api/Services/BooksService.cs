using PersonalLibrary.Models.Database;
using PersonalLibrary.Models.Request;
using PersonalLibrary.Models.Response;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface IBooksService
{
    Task<List<BookResponse>> GetAllBooksResponse();
    void Add(BookRequest newBook);
}

public class BooksService : IBooksService
{
    private readonly IBooksRepo _booksRepo;
    private readonly IAuthorsRepo _authorsRepo;
    private readonly ICollectionsRepo _collectionsRepo;

    public BooksService(IBooksRepo booksRepo, IAuthorsRepo authorsRepo, ICollectionsRepo collectionsRepo)
    {
        _booksRepo = booksRepo;
        _authorsRepo = authorsRepo;
        _collectionsRepo = collectionsRepo;
    }

    public async Task<List<BookResponse>> GetAllBooksResponse()
    {
        var allBooks = await _booksRepo.GetAll();
        return [.. allBooks.Select(b => new BookResponse
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author!.Name,
            Translator = b.Translator,
            Language = b.Language,
            OriginalLanguage = b.OriginalLanguage,
            Collection = b.Collection?.Name,
            PublicationYear = b.PublicationYear,
            EditionPublicationYear = b.EditionPublicationYear,
            Read = b.Read,
            Notes = b.Notes
        })];
    }

    public async void Add(BookRequest newBook)
    {
        var author = await _authorsRepo.GetAuthorByName(newBook.Author);

        if (author == null)
        {
            _authorsRepo.AddAuthor(newBook.Author);
        }

        author = await _authorsRepo.GetAuthorByName(newBook.Author);
        var collection = await _collectionsRepo.GetCollectionByName(newBook.Collection);

        if (author != null && collection != null)
        {
            Book book = new Book
            {
                Id = newBook.Isbn,
                Title = newBook.Title,
                AuthorId = author.Id,
                Translator = newBook.Translator,
                Language = newBook.Language,
                OriginalLanguage = newBook.OriginalLanguage,
                CollectionId = collection.Id,
                PublicationYear = newBook.PublicationYear,
                EditionPublicationYear = newBook.EditionPublicationYear,
                Read = newBook.Read,
                Notes = newBook.Notes
            };
            _booksRepo.Add(book);
        }
    }
}