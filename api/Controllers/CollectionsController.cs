using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Models.Database;
using api.Services;
using Microsoft.AspNetCore.Identity;

namespace api.Controllers;

[ApiController]
[Route("/collections")]
[Authorize]
public class CollectionsController : ControllerBase
{
    private readonly ICollectionsService _collectionsService;
    private readonly UserManager<IdentityUser> _userManager;
    public CollectionsController(ICollectionsService collectionsService, UserManager<IdentityUser> userManager)
    {
        _collectionsService = collectionsService;
        _userManager = userManager;
    }

    [HttpGet]
    [Route("current-user")]
    public async Task<ActionResult<List<Collection>>> GetUserCollections()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return BadRequest(new { message = "User must be logged in" });
        }
        return await _collectionsService.GetByUser(currentUser.UserName!);
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
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return BadRequest(new { message = "User must be logged in" });
            }
            await _collectionsService.Add(char.ToUpper(name[0]) + name[1..], currentUser.UserName!);
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
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return BadRequest(new { message = "User must be logged in" });
            }
            await _collectionsService.Delete(name, currentUser.UserName!);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
        return Ok();
    }
}