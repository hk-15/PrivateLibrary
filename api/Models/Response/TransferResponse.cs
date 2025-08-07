namespace PersonalLibrary.Models.Response;

public class TransferResponse
{
    public int Id { get; set; }
    public string Isbn { get; set; } = "";
    public string BookTitle { get; set; } = "";
    public List<string> Author { get; set; } = [];
    public string TransferFrom { get; set; } = "";
    public string TransferTo { get; set; } = "";
    public string RejectedMessage { get; set; } = "";    
}