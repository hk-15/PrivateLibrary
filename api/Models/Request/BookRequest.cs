namespace PersonalLibrary.Models.Request;

public class BookRequest
{
    public required string Isbn { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public string? Translator { get; set; }
    public required string Language { get; set; }
    public string? OriginalLanguage { get; set; }
    public required string Collection { get; set; }
    public int PublicationYear { get; set; }
    public int EditionPublicationYear { get; set; }
    public bool Read { get; set; }
    public string? Notes { get; set; }
}