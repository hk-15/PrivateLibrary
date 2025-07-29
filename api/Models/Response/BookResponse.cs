namespace PersonalLibrary.Models.Response;

public class BookResponse
{
    public required int Id { get; set; }
    public required string Isbn { get; set; }
    public required string Title { get; set; }
    public string? SortTitle { get; set; }
    public string? Subtitle { get; set; }
    public List<string> Authors { get; set; } = [];
    public string? SortAuthor { get; set; }
    public string? Translator { get; set; }
    public string? SortTranslator { get; set; }
    public required string Language { get; set; }
    public string? OriginalLanguage { get; set; }
    public string? Collection { get; set; }
    public int PublicationYear { get; set; }
    public bool Read { get; set; }
    public string? Notes { get; set; }
    public List<string> Tags { get; set; } = [];
    public string? Library { get; set; }
}