using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Exceptions;
using api.Models.Request;
using api.Services;

namespace api.Controllers;

[ApiController]
[Route("/transfers")]
[Authorize]
public class TransfersController : ControllerBase
{
    private readonly ITransfersService _transfersService;
    private readonly UserManager<IdentityUser> _userManager;
    public TransfersController(ITransfersService transfersService, UserManager<IdentityUser> userManager)
    {
        _transfersService = transfersService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserTransfers()
    {
        var currentUserId = _userManager.GetUserId(User);
        if (string.IsNullOrEmpty(currentUserId))
        {
            return BadRequest(new { message = "User must be logged in" });
        }
        try
        {
            var response = await _transfersService.GetByUser(currentUserId);
            return Ok(response.ToList());
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddTransferRequest([FromBody] TransferRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var currentUserId = _userManager.GetUserId(User);
        if (string.IsNullOrEmpty(currentUserId))
        {
            return BadRequest(new { message = "User must be logged in" });
        }
        try
        {
            var newUser = await _userManager.FindByNameAsync(request.Username) ?? throw new NotFoundException("User not found");
            await _transfersService.Add(request.Ids, currentUserId, newUser.Id);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPatch]
    [Route("reject/{id}")]
    public async Task<IActionResult> RejectTransfer(int id, [FromBody] string message)
    {
        try
        {
            await _transfersService.Reject(id, message);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPatch]
    [Route("accept/{id}")]
    public async Task<IActionResult> AcceptTransfer(int id, [FromBody] string message)
    {
        try
        {
            await _transfersService.Accept(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _transfersService.Delete(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}