using Microsoft.AspNetCore.Mvc;
using PersonalLibrary.Models.Request;
using PersonalLibrary.Models.Response;
using PersonalLibrary.Services;

namespace PersonalLibrary.Controllers;

[ApiController]
[Route("/Books")]
public class BooksController : ControllerBase
{
    private readonly IBooksService _booksService;
    public BooksController(IBooksService booksService)
    {
        _booksService = booksService;
    }

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<List<BookResponse>>> GetAllBooks()
    {
        var allBooks = await _booksService.GetAllBooksResponse();
        return allBooks;
    }

    [HttpPost]
    public IActionResult AddBook([FromBody] BookRequest newBook)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            _booksService.Add(newBook);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }
}