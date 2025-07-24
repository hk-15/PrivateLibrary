using Microsoft.AspNetCore.Mvc;
using PersonalLibrary.Models.Database;
using PersonalLibrary.Services;

namespace PersonalLibrary.Controllers;

[ApiController]
[Route("/collections")]
public class LibrariesController : ControllerBase
{
    private readonly ILibrariesService _librariesService;
    public LibrariesController(ILibrariesService librariesService)
    {
        _librariesService = librariesService;
    }

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<List<Library>>> GetAllLibraries()
    {
        return await _librariesService.GetAll();
    } 

    [HttpPost]
    public async Task<IActionResult> AddLibrary([FromBody]string name)
    {
        if (name == null)
        {
            return BadRequest();
        }
        try
        {
            await _librariesService.Add(char.ToUpper(name[0]) + name[1..]);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }
}