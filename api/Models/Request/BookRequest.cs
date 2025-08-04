using System.ComponentModel.DataAnnotations;

namespace PersonalLibrary.Models.Request;

public class BookRequest
{
    [MinLength(10), MaxLength(13)]
    public required string Isbn { get; set; }
    public required string Title { get; set; }
    public string? Subtitle { get; set; }
    public List<string> Authors { get; set; } = [];
    public string? Translator { get; set; }
    public required string Language { get; set; }
    public string? OriginalLanguage { get; set; }
    public required int CollectionId { get; set; }
    public int PublicationYear { get; set; }
    public bool Read { get; set; }
    public string? Notes { get; set; }
    public List<string> Tags { get; set; } = [];
}