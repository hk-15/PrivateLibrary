using System.ComponentModel.DataAnnotations;

namespace PersonalLibrary.Models.Database;

public class Book
{
    public int Id { get; set; }
    [MinLength(10), MaxLength(13)]
    public required string Isbn { get; set; }
    public required string Title { get; set; }
    public string? Subtitle { get; set; }
    public int AuthorId { get; set; }
    public Author? Author { get; set; }
    public string? Translator { get; set; }
    public required string Language { get; set; }
    public string? OriginalLanguage { get; set; }
    public int CollectionId { get; set; }
    public Collection? Collection { get; set; }
    public int PublicationYear { get; set; }
    public bool Read { get; set; }
    public string? Notes { get; set; }
}