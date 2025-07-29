using PersonalLibrary.Models.Database;
using PersonalLibrary.Repositories;

namespace PersonalLibrary.Services;

public interface IAuthorsService
{
    Task<List<Author>> GetListFromRequest(List<string> request);
    Task DeleteUnnecessaryAuthors(List<Author> authors);
}

public class AuthorsService : IAuthorsService
{
    private readonly IAuthorsRepo _authorsRepo;
    public AuthorsService(IAuthorsRepo authorsRepo)
    {
        _authorsRepo = authorsRepo;
    }

    public async Task<List<Author>> GetListFromRequest(List<string> request)
    {
        var authors = new List<Author>();
        foreach (var name in request)
        {
            var authorRecord = await _authorsRepo.GetByName(name.Trim());
            authorRecord ??= await _authorsRepo.Add(name.Trim());
            authors.Add(authorRecord);
        }
        return authors;
    }

    public async Task DeleteUnnecessaryAuthors(List<Author> authors)
    {
        foreach (var author in authors)
        {
            var remainingBooks = await _authorsRepo.GetBooks(author.Id);
            if (remainingBooks != null && !remainingBooks.Any())
            {
                _authorsRepo.Delete(author);
            }
        }
    }
}