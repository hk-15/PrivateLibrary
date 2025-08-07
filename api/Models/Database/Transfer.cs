using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PersonalLibrary.Models.Database;

public class Transfer
{
    public int Id { get; set; }
    public required int BookId { get; set; }
    [Required]
    public Book Book { get; set; } = null!;
    public required string UserId { get; set; }
    [Required]
    public IdentityUser User { get; set; } = null!;
    public required string NewUserId { get; set; }
    [Required]
    public IdentityUser NewUser { get; set; } = null!;
    public string RejectedMessage { get; set; } = "";
}