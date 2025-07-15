namespace PersonalLibrary.Models.Response;

public class BookResponse
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public string? Translator { get; set; }
    public required string Language { get; set; }
    public string? OriginalLanguage { get; set; }
    public string? Collection { get; set; }
    public DateOnly PublicationYear { get; set; }
    public DateOnly EditionPublicationYear { get; set; }
    public bool Read { get; set; }
    public string? Notes { get; set; }
}