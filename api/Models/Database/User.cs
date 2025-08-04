using Microsoft.AspNetCore.Identity;

namespace PersonalLibrary.Models.Database;
public class User : IdentityUser
{
    public required string Name { get; set; }
}