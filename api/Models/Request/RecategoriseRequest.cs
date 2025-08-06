namespace PersonalLibrary.Models.Request;

public class RecategoriseRequest
{
    public required List<int> Ids { get; set; }
    public required int CollectionId { get; set; }

}