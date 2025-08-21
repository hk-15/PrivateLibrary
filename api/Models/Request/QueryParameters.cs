namespace PersonalLibrary.Models.Request;

public class QueryParameters
{
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 25;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > 100 ? 100 : value;
    }
    public string? SortBy { get; set; }
    public string? SearchTerm { get; set; }
}