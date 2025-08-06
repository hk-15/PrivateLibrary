using PersonalLibrary.Models.Database;
using PersonalLibrary.Models.Request;
using PersonalLibrary.Models.Response;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface IBooksService
{
    Task<List<BookResponse>> GetAllBooksResponse();
    Task<List<BookResponse>> GetByUser(string userId);
    Task<List<Book>> GetByCollection(Collection collection);
    Task Add(BookRequest newBook, string userId);
    Task UpdateReadStatus(int id);
    Task Update(int id, BookRequest book);
    Task Delete(int id);
}

public class BooksService : IBooksService
{
    private readonly IBooksRepo _booksRepo;
    private readonly IAuthorsService _authorsService;
    private readonly ITagsService _tagsService;
    public BooksService(IBooksRepo booksRepo, IAuthorsService authorsService, ITagsService tagsService)
    {
        _booksRepo = booksRepo;
        _authorsService = authorsService;
        _tagsService = tagsService;
    }

    public async Task<List<BookResponse>> GetAllBooksResponse()
    {
        var allBooks = await _booksRepo.GetAll();
        return MapResponse(allBooks);
    }

    public async Task<List<BookResponse>> GetByUser(string userId)
    {
        var books = await _booksRepo.GetByUserId(userId);
        return MapResponse(books);
    }

    public async Task<List<Book>> GetByCollection(Collection collection)
    {
        return await _booksRepo.GetByCollectionId(collection.Id);
    }

    public async Task Add(BookRequest newBook, string userId)
    {
        CleanData(newBook);
        var authors = await _authorsService.GetListFromRequest(newBook.Authors);
        var tags = await _tagsService.GetListFromRequest(newBook.Tags);

        Book book = new()
        {
            Isbn = newBook.Isbn,
            Title = newBook.Title,
            Authors = authors,
            Translator = newBook.Translator,
            Language = newBook.Language,
            OriginalLanguage = newBook.OriginalLanguage,
            CollectionId = newBook.CollectionId,
            PublicationYear = newBook.PublicationYear,
            Read = newBook.Read,
            Notes = newBook.Notes,
            Tags = tags,
            UserId = userId
        };
        await _booksRepo.Add(book);
    }

    public async Task UpdateReadStatus(int id)
    {
        var book = await _booksRepo.Get(id);
        if (book.Read == true)
        {
            book.Read = false;
        }
        else
        {
            book.Read = true;
        }
        await _booksRepo.Update(book);
    }

    public async Task Update(int id, BookRequest request)
    {
        CleanData(request);
        var oldBook = await _booksRepo.Get(id);
        UpdateBookFields(request, oldBook);

        if (!oldBook.Authors.Select(a => a.Name).SequenceEqual(request.Authors))
        {
            var oldAuthors = oldBook.Authors;
            var newAuthors = await _authorsService.GetListFromRequest(request.Authors);
            oldBook.Authors = newAuthors;

            await _booksRepo.Update(oldBook);
            await _authorsService.DeleteUnnecessaryAuthors(oldAuthors);
        }

        if (!oldBook.Tags.Select(t => t.Name).SequenceEqual(request.Tags))
        {
            var oldTags = oldBook.Tags;
            var newTags = await _tagsService.GetListFromRequest(request.Tags);
            oldBook.Tags = newTags;
            await _booksRepo.Update(oldBook);
            await _tagsService.DeleteUnnecessaryTags(oldTags);
        }
        await _booksRepo.Update(oldBook);
    }

    public async Task Delete(int id)
    {
        var book = await _booksRepo.Get(id);
        var authors = book.Authors;
        var tags = book.Tags;
        _booksRepo.Delete(book);
        await _authorsService.DeleteUnnecessaryAuthors(authors);
        await _tagsService.DeleteUnnecessaryTags(tags);
    }

    public static string RemoveLeadingArticle(string title)
    {
        var articles = new[] { "The ", "A ", "An " };
        foreach (var article in articles)
        {
            if (title.StartsWith(article, StringComparison.OrdinalIgnoreCase))
            {
                return title.Substring(article.Length);
            }
        }
        return title;
    }

    private static void UpdateBookFields(BookRequest request, Book book)
    {
        book.Isbn = request.Isbn;
        book.Title = request.Title;
        book.Subtitle = request.Subtitle;
        book.Translator = request.Translator;
        book.Language = request.Language;
        book.OriginalLanguage = request.OriginalLanguage;
        book.PublicationYear = request.PublicationYear;
        book.Notes = request.Notes;
        book.CollectionId = request.CollectionId;
    }

    private static string CapitaliseString(string input)
    {
        List<string> capitalised = [];
        foreach (var word in input.Trim().Split(' '))
        {
            capitalised.Add(char.ToUpper(word[0]) + word[1..]);
        }
        return string.Join(' ', capitalised);
    }

    private static void CleanData(BookRequest request)
    {
        request.Isbn = request.Isbn.Trim();
        request.Title = request.Title.Trim();
        if (!string.IsNullOrEmpty(request.Subtitle)) request.Subtitle = request.Subtitle.Trim();
        if (!string.IsNullOrEmpty(request.Translator)) request.Translator = request.Translator.Trim();
        request.Language = CapitaliseString(request.Language);
        if (!string.IsNullOrEmpty(request.OriginalLanguage)) request.OriginalLanguage = CapitaliseString(request.OriginalLanguage);
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

    private static List<string> GetBookTags(List<Tag> tagsList)
    {
        if (tagsList.Count == 0) return [];

        var tags = new List<string>();
        foreach (var tag in tagsList)
        {
            tags.Add(tag.Name);
        }
        return tags;
    }

    private static List<BookResponse> MapResponse(List<Book> books)
    {
        return [.. books.Select(b => new BookResponse
        {
            Id = b.Id,
            Isbn = b.Isbn,
            Title = b.Title,
            SortTitle = RemoveLeadingArticle(b.Title),
            Subtitle = b.Subtitle,
            Authors = GetAuthorNames(b.Authors),
            SortAuthor = b.Authors.Count > 0
                ? b.Authors[0].Name.Split(' ').Last()
                : "",
            Translator = b.Translator,
            SortTranslator = b.Translator?.Split(' ').Last(),
            Language = b.Language,
            OriginalLanguage = b.OriginalLanguage,
            Collection = b.Collection?.Name,
            PublicationYear = b.PublicationYear,
            Read = b.Read,
            Notes = b.Notes,
            Tags = GetBookTags(b.Tags),
            Owner = b.User != null
                ? b.User.Name
                : ""
        })];
    }
}