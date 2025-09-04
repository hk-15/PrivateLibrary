namespace api.Models.Request;

public class CreateAccountRequest
{
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}