namespace PersonalLibrary.Models.Database;

public class Author
{
    public Author()
    {
        Books = new List<Book>();
    }
    public int Id { get; set; }
    public required string Name { get; set; }
    public IList<Book>? Books { get; set; }
}