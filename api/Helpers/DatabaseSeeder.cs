using PersonalLibrary.Database;
using PersonalLibrary.Models.Database;

namespace PersonalLibrary.Helpers;
public class DatabaseSeeder
{
    public static async Task SeedDatabase (IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<PersonalLibraryDbContext>();

        if (!context.Set<Collection>().Any())
        {
            List<Collection> collections = [
                new Collection { Id = 1, Name = "Fiction"},
                new Collection { Id = 2, Name = "Non-fiction"},
                new Collection { Id = 3, Name = "Poetry"},
                new Collection { Id = 4, Name = "Anthologies"},
                new Collection { Id = 5, Name = "Plays" }
            ];
            await context.Set<Collection>().AddRangeAsync(collections);
            await context.SaveChangesAsync();
        }
        if (!context.Set<Library>().Any())
        {
            await context.Set<Library>().AddAsync(new Library { Id = 1, Name = "Holly" });
            await context.SaveChangesAsync();
        }
        if (!context.Set<Author>().Any())
        {
            List<Author> authors = [
                new Author { Id = 1, Name = "Giovanni Boccaccio"},
                new Author { Id = 2, Name = "Safiya Sinclair"},
                new Author { Id = 3, Name = "Tara Isabella Burton"},
                new Author { Id = 4, Name = "David Nicholls"},
                new Author { Id = 5, Name = "Eva Baltasar"},
                new Author { Id = 6, Name = "Christian Kracht"},
                new Author { Id = 7, Name = "Ned Beauman"},
                new Author { Id = 8, Name = "Doris Lessing"},
                new Author { Id = 9, Name = "Olga Tokarczuk"},
                new Author { Id = 10, Name = "Rebecca Tamás"},
                new Author { Id = 11, Name = "Homer"},
                new Author { Id = 12, Name = "Fran Lebowitz"},
                new Author { Id = 13, Name = "William Shakespeare"},
                new Author { Id = 14, Name = "Vincenzo Latronico"},
                new Author { Id = 15, Name = "Percival Everett"},
                new Author { Id = 16, Name = "Jenny Erpenbeck"},
                new Author { Id = 17, Name = "Bora Chung"},
                new Author { Id = 18, Name = "Sam Knight"},
                new Author { Id = 19, Name = "Brandon Taylor"},
                new Author { Id = 20, Name = "Don DeLillo"},
                new Author { Id = 21, Name = "Hiromi Kawakami"},
                new Author { Id = 22, Name = "Mercè Rodoreda"},
                new Author { Id = 23, Name = "Muriel Spark"},
                new Author { Id = 24, Name = "Sappho"},
                new Author { Id = 25, Name = "Maggie Nelson"}
            ];
            await context.Set<Author>().AddRangeAsync(authors);
            await context.SaveChangesAsync();

            List<Book> books = [
                new Book { Id = 1, Isbn = "9780140449303", Title = "The Decameron", Authors = [authors[0]], Translator = "G. H. McWilliam", Language = "English", OriginalLanguage = "Italian", CollectionId = 1, PublicationYear = 1972, Read = false, Notes = "Currently reading", LibraryId = 1 },
                new Book { Id = 2, Isbn = "9781529030235", Title = "Cannibal", Authors = [authors[1]], Language = "English", CollectionId = 3, PublicationYear = 2016, Read = true, LibraryId = 1 },
                new Book { Id = 3, Isbn = "9781529364736", Title = "Self-Made", Authors = [authors[2]], Language = "English", CollectionId = 2, PublicationYear = 2023, Read = true, LibraryId = 1 },
                new Book { Id = 4, Isbn = "9780340896983", Title = "One Day", Authors = [authors[3]], Language = "English", CollectionId = 1, PublicationYear = 2009, Read = true, LibraryId = 1 },
                new Book { Id = 5, Isbn = "9781911508755", Title = "Permafrost", Authors = [authors[4]], Translator = "Julia Sanches", Language = "English", OriginalLanguage = "Catalan", CollectionId = 1, PublicationYear = 2021, Read = true, LibraryId = 1 },
                new Book { Id = 6, Isbn = "9781805223047", Title = "Eurotrash", Authors = [authors[5]], Translator = "Daniel Bowles", Language = "English", OriginalLanguage = "German", CollectionId = 1, PublicationYear = 2024, Read = true, Notes = "International Booker Prize shortlistee 2025", LibraryId = 1 },
                new Book { Id = 7, Isbn = "9781473613577", Title = "Venomous Lumpsucker", Authors = [authors[6]], Language = "English", CollectionId = 1, PublicationYear = 2022, Read = true, LibraryId = 1 },
                new Book { Id = 8, Isbn = "9780586092262", Title = "London Observed", Subtitle = "Stories and Sketches", Authors = [authors[7]], Language = "English", CollectionId = 1, PublicationYear = 1992, Read = true, LibraryId = 1 },
                new Book { Id = 9, Isbn = "9781910695593", Title = "The Books of Jacob", Authors = [authors[8]], Translator = "Jennifer Croft", Language = "English", OriginalLanguage = "Polish", CollectionId = 1, PublicationYear = 2021, Read = true, LibraryId = 1 },
                new Book { Id = 10, Isbn = "9781908058621", Title = "Witch", Authors = [authors[9]], Language = "English", CollectionId = 3, PublicationYear = 2019, Read = true, LibraryId = 1 },
                new Book { Id = 11, Isbn = "9780393356250", Title = "The Odyssey", Authors = [authors[10]], Translator = "Emily Wilson", Language = "English", OriginalLanguage = "Greek", CollectionId = 3, PublicationYear = 2018, Read = true, LibraryId = 1 },
                new Book { Id = 12, Isbn = "9780349015903", Title = "The Fran Lebowitz Reader", Authors = [authors[11]], Language = "English", CollectionId = 2, PublicationYear = 1994, Read = true, LibraryId = 1 },
                new Book { Id = 13, Isbn = "9781903436592", Title = "King Lear", Authors = [authors[12]], Language = "English", CollectionId = 5, PublicationYear = 1608, Read = true, LibraryId = 1 },
                new Book { Id = 14, Isbn = "9781903436332", Title = "King Richard II", Authors = [authors[12]], Language = "English", CollectionId = 5, PublicationYear = 1353, Read = true, LibraryId = 1 },
                new Book { Id = 15, Isbn = "9781804271049", Title = "Perfection", Authors = [authors[13]], Translator = "Sophie Hughes", Language = "English", OriginalLanguage = "Italian", CollectionId = 1, PublicationYear = 2025, Read = true, LibraryId = 1 },
                new Book { Id = 16, Isbn = "9781914391170", Title = "The Trees", Authors = [authors[14]], Language = "English", CollectionId = 1, PublicationYear = 2021, Read = true, LibraryId = 1 },
                new Book { Id = 17, Isbn = "9781783786138", Title = "Kairos", Authors = [authors[15]], Translator = "Michael Hofmann", Language = "English", OriginalLanguage = "German", CollectionId = 1, PublicationYear = 2023, Read = true, Notes = "International Booker Prize winner 2024", LibraryId = 1 },
                new Book { Id = 18, Isbn = "9781916277182", Title = "Cursed Bunny", Authors = [authors[16]], Translator = "Anton Hur", Language = "English", OriginalLanguage = "Korean", CollectionId = 1, PublicationYear = 2021, Read = true, LibraryId = 1 },
                new Book { Id = 19, Isbn = "9780571357567", Title = "The Premonitions Bureau", Authors = [authors[17]], Language = "English", CollectionId = 2, PublicationYear = 2022, Read = true, LibraryId = 1 },
                new Book { Id = 20, Isbn = "9781911547747", Title = "Real Life", Authors = [authors[18]], Language = "English", CollectionId = 1, PublicationYear = 2020, Read = true, LibraryId = 1 },
                new Book { Id = 21, Isbn = "9780330369954", Title = "Underworld", Authors = [authors[19]], Language = "English", CollectionId = 1, PublicationYear = 1997, Read = true, LibraryId = 1 },
                new Book { Id = 22, Isbn = "9781803512358", Title = "Under the Eye of the Big Bird", Authors = [authors[20]], Translator = "Asa Yoneda", Language = "English", OriginalLanguage = "Japanese", CollectionId = 1, PublicationYear = 2024,Read = true, Notes = "International Booker Prize shortlistee 2025", LibraryId = 1 },
                new Book { Id = 23, Isbn = "9780415014144", Title = "King Henry V", Authors = [authors[12]], Language = "English", CollectionId = 5, PublicationYear = 1623, Read = true, LibraryId = 1 },
                new Book { Id = 24, Isbn = "9780241352540", Title = "Death in Spring", Authors = [authors[21]], Translator = "Martha Tennent", Language = "English", OriginalLanguage = "Catalan", CollectionId = 1, PublicationYear = 2009, Read = true, LibraryId = 1 },
                new Book { Id = 25, Isbn = "9781844085514", Title = "A Far Cry from Kensington", Authors = [authors[22]], Language = "English", CollectionId = 1, PublicationYear = 1988, Read = true, LibraryId = 1 },
                new Book { Id = 26, Isbn = "9781844080816", Title = "If Not, Winter", Subtitle = "Fragments of Sappho", Authors = [authors[23]], Translator = "Anne Carson", Language = "English", OriginalLanguage = "Greek", CollectionId = 3, PublicationYear = 2002, Read = true, LibraryId = 1 },
                new Book { Id = 27, Isbn = "9781593766580", Title = "Jane", Subtitle = "A Murder", Authors = [authors[24]], Language = "English", CollectionId = 3, PublicationYear = 2005, Read = true, LibraryId = 1 },
            ];
            await context.Set<Book>().AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}