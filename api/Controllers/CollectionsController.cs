using Microsoft.AspNetCore.Mvc;
using PersonalLibrary.Models.Request;
using PersonalLibrary.Models.Response;
using PersonalLibrary.Services;

namespace PersonalLibrary.Controllers;

[ApiController]
[Route("/Collections")]
public class CollectionsController : ControllerBase
{
    private readonly ICollectionsService _collectionsService;
    public CollectionsController(ICollectionsService collectionsService)
    {
        _collectionsService = collectionsService;
    }

    [HttpPost]
    public IActionResult AddCollection(string name)
    {
        if (name == null)
        {
            return BadRequest();
        }
        try
        {
            _collectionsService.AddCollection(name);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        return Ok();
    }
}