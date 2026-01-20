using api.Models.Database;
using api.Repositories;

namespace api.Services;

public interface ITagsService
{
    Task<List<Tag>> GetListFromRequest(List<string> request);
    Task DeleteUnnecessaryTags(List<Tag> tags);
}

public class TagsService(ITagsRepo tagsRepo) : ITagsService
{
    private readonly ITagsRepo _tagsRepo = tagsRepo;

    public async Task<List<Tag>> GetListFromRequest(List<string> request)
    {
        var tags = new List<Tag>();
        if (request != null)
        {
            foreach (var tag in request)
            {
                var tagRecord = await _tagsRepo.GetByName(tag);
                tagRecord ??= await _tagsRepo.Add(tag);
                tags.Add(tagRecord);
            }
        }
        return tags;
    }

    public async Task DeleteUnnecessaryTags(List<Tag> tags)
    {
        foreach (var tag in tags)
        {
            var remainingBooks = await _tagsRepo.GetBooks(tag.Id);
            if (remainingBooks != null && !remainingBooks.Any())
            {
                _tagsRepo.Delete(tag);
            }
        }
    }
}