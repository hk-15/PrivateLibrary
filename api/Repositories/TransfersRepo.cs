using Microsoft.EntityFrameworkCore;
using PersonalLibrary.Database;
using PersonalLibrary.Exceptions;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Repositories;

public interface ITransfersRepo
{
    Task<Transfer> Get(int id);
    Task<List<Transfer>> GetByUser(string userId);
    Task Add(List<Transfer> transfers);
    Task Update(Transfer transfer);
    void Delete(Transfer transfer);
}

public class TransfersRepo : ITransfersRepo
{
    private readonly PersonalLibraryDbContext _context;

    public TransfersRepo(PersonalLibraryDbContext context)
    {
        _context = context;
    }

    public async Task<Transfer> Get(int id)
    {
        return await _context.Transfers
            .Include(t => t.Book)
            .Include(t => t.User)
            .Include(t => t.NewUser)
            .FirstOrDefaultAsync(t => t.Id == id) ?? throw new NotFoundException("Transfer not found");
    }
    public async Task<List<Transfer>> GetByUser(string userId)
    {
        return await _context.Transfers
            .Include(t => t.Book)
            .ThenInclude(b => b.Authors)
            .Include(t => t.User)
            .Include(t => t.NewUser)
            .Where(t => t.UserId == userId || t.NewUserId == userId)
            .ToListAsync();
    }

    public async Task Add(List<Transfer> transfers)
    {
        await _context.AddRangeAsync(transfers);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Transfer transfer)
    {
        _context.Update(transfer);
        await _context.SaveChangesAsync();
    }

    public void Delete(Transfer transfer)
    {
        _context.Remove(transfer);
        _context.SaveChanges();
    }
}