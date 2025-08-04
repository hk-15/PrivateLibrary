using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PersonalLibrary.Models.Request;
using PersonalLibrary.Models.Response;
using PersonalLibrary.Services;

namespace PersonalLibrary.Controllers;

[ApiController]
[Route("/books")]
public class BooksController : ControllerBase
{
    private readonly IBooksService _booksService;
    private readonly UserManager<IdentityUser> _userManager;
    public BooksController(IBooksService booksService, UserManager<IdentityUser> userManager)
    {
        _booksService = booksService;
        _userManager = userManager;
    }

    [HttpGet]
    [Route("/all")]
    public async Task<ActionResult<List<BookResponse>>> GetAllBooks()
    {
        return await _booksService.GetAllBooksResponse();
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetBooks([FromQuery] QueryParameters parameters)
    {
        var currentUserId = _userManager.GetUserId(User);
        if (string.IsNullOrEmpty(currentUserId))
        {
            return BadRequest("User must be logged in");
        }

        var books = await _booksService.GetBooksByUser(currentUserId);
        var query = books.AsQueryable();

        if (!string.IsNullOrWhiteSpace(parameters.SearchTerm))
        {
            var searchTerm = parameters.SearchTerm.Trim();
            query = query.Where(b =>
            b.Isbn.Contains(searchTerm) ||
            b.Authors.Any(a => a.Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase)) ||
            (b.Translator ?? "").Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase) ||
            b.Title.Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase) ||
            b.Language.Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase) ||
            (b.OriginalLanguage ?? "").Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase) ||
            (b.Notes ?? "").Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase) ||
            b.Tags.Any(t => t.Contains(searchTerm, StringComparison.CurrentCultureIgnoreCase))
            );
        }

        if (!string.IsNullOrWhiteSpace(parameters.SortBy))
        {
            query = SortQuery(parameters.SortBy, query);
        }
        else
        {
            query = query.OrderBy(b => b.SortTitle);
        }

        var skipAmount = (parameters.PageNumber - 1) * parameters.PageSize;
        query = query.Skip(skipAmount).Take(parameters.PageSize);

        return Ok(query.ToList());
    }

    [HttpPost]
    public async Task<IActionResult> AddBook([FromBody] BookRequest newBook)
    {
        var currentUserId = _userManager.GetUserId(User);
        if (string.IsNullOrEmpty(currentUserId))
        {
            return BadRequest("User must be logged in");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            await _booksService.Add(newBook, currentUserId);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }

    [HttpPatch]
    [Route("edit/{id}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] BookRequest book)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            await _booksService.Update(id, book);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateReadStatus(int id)
    {
        try
        {
            await _booksService.UpdateReadStatus(id);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        try
        {
            await _booksService.Delete(id);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }

    public static IQueryable<BookResponse> SortQuery(string sortByTerm, IQueryable<BookResponse> query)
    {
        if (sortByTerm == "Author") return query.OrderBy(b => b.SortAuthor);
        else if (sortByTerm == "Translator") return query.OrderBy(b => b.SortTranslator == null).ThenBy(b => b.SortTranslator);
        else if (sortByTerm == "Publication") return query.OrderBy(b => b.PublicationYear);
        else return query.OrderBy(b => b.SortTitle);
    }
}