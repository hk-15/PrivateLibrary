using Microsoft.AspNetCore.Mvc;
using PersonalLibrary.Models.Database;
using PersonalLibrary.Services;

namespace PersonalLibrary.Controllers;

[ApiController]
[Route("/collections")]
public class CollectionsController : ControllerBase
{
    private readonly ICollectionsService _collectionsService;
    public CollectionsController(ICollectionsService collectionsService)
    {
        _collectionsService = collectionsService;
    }

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<List<Collection>>> GetAllBooks()
    {
        return await _collectionsService.GetAll();
    } 

    [HttpPost]
    public async Task<IActionResult> AddCollection([FromBody]string name)
    {
        if (name == null)
        {
            return BadRequest();
        }
        try
        {
            await _collectionsService.AddCollection(char.ToUpper(name[0]) + name[1..]);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }
}