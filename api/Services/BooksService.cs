using PersonalLibrary.Models.Database;
using PersonalLibrary.Models.Request;
using PersonalLibrary.Models.Response;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface IBooksService
{
    Task<List<BookResponse>> GetAllBooksResponse();
    Task Add(BookRequest newBook);
    Task UpdateReadStatus(int id);
    Task UpdateBook(int id, BookRequest book);
    Task DeleteBook(int id);
}

public class BooksService : IBooksService
{
    private readonly IBooksRepo _booksRepo;
    private readonly IAuthorsRepo _authorsRepo;
    public BooksService(IBooksRepo booksRepo, IAuthorsRepo authorsRepo)
    {
        _booksRepo = booksRepo;
        _authorsRepo = authorsRepo;
    }

    public async Task<List<BookResponse>> GetAllBooksResponse()
    {
        var allBooks = await _booksRepo.GetAll();
        return [.. allBooks.Select(b => new BookResponse
        {
            Id = b.Id,
            Isbn = b.Isbn,
            Title = b.Title,
            SortTitle = RemoveLeadingArticle(b.Title),
            Subtitle = b.Subtitle,
            Author = b.Author!.Name,
            SortAuthor = b.Author.Name.Split(' ').Last(),
            Translator = b.Translator,
            SortTranslator = b.Translator?.Split(' ').Last(),
            Language = b.Language,
            OriginalLanguage = b.OriginalLanguage,
            Collection = b.Collection?.Name,
            PublicationYear = b.PublicationYear,
            Read = b.Read,
            Notes = b.Notes
        })];
    }

    public async Task Add(BookRequest newBook)
    {
        var author = await _authorsRepo.GetByName(newBook.Author);
        author ??= await _authorsRepo.Add(newBook.Author);

        Book book = new()
        {
            Isbn = newBook.Isbn,
            Title = newBook.Title,
            Author = author,
            Translator = newBook.Translator,
            Language = newBook.Language,
            OriginalLanguage = newBook.OriginalLanguage,
            CollectionId = newBook.CollectionId,
            PublicationYear = newBook.PublicationYear,
            Read = newBook.Read,
            Notes = newBook.Notes
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

    public async Task UpdateBook(int id, BookRequest request)
    {
        var oldBook = await _booksRepo.Get(id);
        UpdateBookFields(request, oldBook);

        if (oldBook.Author?.Name != request.Author)
        {
            var oldAuthor = oldBook.Author != null ? await _authorsRepo.GetByName(oldBook.Author.Name) : null;
            var newAuthor = await _authorsRepo.GetByName(request.Author);
            newAuthor ??= await _authorsRepo.Add(request.Author);

            oldBook.AuthorId = newAuthor.Id;

            await _booksRepo.Update(oldBook);

            if (oldAuthor != null)
            {
                var remainingBooks = await _authorsRepo.GetBooks(oldAuthor.Id);
                if (remainingBooks != null && !remainingBooks.Any())
                {
                    _authorsRepo.Delete(oldAuthor);
                }
            }
        }
        else
        {
            await _booksRepo.Update(oldBook);
        }
    }

    public async Task DeleteBook(int id)
    {
        var book = await _booksRepo.Get(id);
        _booksRepo.Delete(book);
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

    private void UpdateBookFields(BookRequest request, Book book)
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
}