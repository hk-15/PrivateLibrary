using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using api.Models.Request;

namespace api.Controllers;

[ApiController]
[Route("/accounts")]
public class AccountsController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AccountsController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid Email" });
        }

        var result = await _signInManager.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: false,
            lockoutOnFailure: false
        );
        if (!result.Succeeded)
        {
            return Unauthorized(new { message = "Invalid password" });
        }
        bool isAdmin = false;
        var roles = await _userManager.GetRolesAsync(user);
        if (roles.Contains("Admin"))
        {
            isAdmin = true;
        }
        return Ok(new { message = "Login successful", isAdmin, user.UserName });
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateAccountRequest newUser)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var user = new IdentityUser { UserName = newUser.UserName, Email = newUser.Email };

            if (await _userManager.FindByNameAsync(newUser.UserName) != null)
            {
                return BadRequest(new { message = "Sorry, that username is unavailable. Please choose another." });
            }
            else if (await _userManager.FindByEmailAsync(newUser.Email!) != null)
            {
                return BadRequest(new { message = "Sorry, there is already an account associated with that email. Please try logging in." } );
            }

            var result = await _userManager.CreateAsync(user, newUser.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Sorry, cannot create account right now. Please try again later." });
            }

            await _userManager.AddToRoleAsync(user, "User");
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }

        return Ok();
    }
}