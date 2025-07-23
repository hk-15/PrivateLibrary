namespace PersonalLibrary.Models.Database;

public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Book> Books { get; set; } = [];
}