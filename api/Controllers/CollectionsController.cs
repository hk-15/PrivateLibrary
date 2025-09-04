using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Models.Database;
using api.Services;

namespace api.Controllers;

[ApiController]
[Route("/collections")]
[Authorize]
public class CollectionsController : ControllerBase
{
    private readonly ICollectionsService _collectionsService;
    public CollectionsController(ICollectionsService collectionsService)
    {
        _collectionsService = collectionsService;
    }

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<List<Collection>>> GetAllCollections()
    {
        return await _collectionsService.GetAll();
    }

    [HttpPost]
    public async Task<IActionResult> AddCollection([FromBody] string name)
    {
        if (name == null)
        {
            return BadRequest();
        }
        try
        {
            await _collectionsService.Add(char.ToUpper(name[0]) + name[1..]);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCollection([FromBody] string name)
    {
        try
        {
            await _collectionsService.Delete(name);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
        return Ok();
    }
}