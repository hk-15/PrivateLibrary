using Microsoft.AspNetCore.Identity;

namespace api.Models.Database;

public class Collection
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<string> Users { get; set; } = [];
}