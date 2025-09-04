namespace api.Models.Request;

public class TransferRequest
{
    public required List<int> Ids { get; set; }
    public required string Username { get; set; }

}