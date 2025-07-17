using Microsoft.AspNetCore.Mvc;

namespace PersonalLibrary.Controllers;

public abstract class BaseApiController : ControllerBase
{
    protected int DefaultPageSize { get; } = 25;

    protected int MaxPageSize { get; } = 50;

    protected BaseApiController()
    {
        DefaultPageSize = 25;
        MaxPageSize = 50;
    }

    protected int GetPageSize(int pageSize)
    {
        return pageSize > MaxPageSize ? MaxPageSize : pageSize;
    }

    protected int GetPageNumber(int pageNumber)
    {
        return pageNumber < 1 ? 1 : pageNumber;
    }
}