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
        }

        if (!context.Set<Book>().Any())
        {
            List<Book> books = [
                new Book { Isbn = "9780140449303", Title = "The Decameron", AuthorId = 1, Translator = "G. H. McWilliam", Language = "English", OriginalLanguage = "Italian", CollectionId = 1, PublicationYear = 1972, Read = false, Notes = "Currently reading"},
                new Book { Isbn = "9781529030235", Title = "Cannibal", AuthorId = 2, Language = "English", CollectionId = 3, PublicationYear = 2016, Read = true},
                new Book { Isbn = "9781529364736", Title = "Self-Made", AuthorId = 3, Language = "English", CollectionId = 2, PublicationYear = 2023, Read = true},
                new Book { Isbn = "9780340896983", Title = "One Day", AuthorId = 4, Language = "English", CollectionId = 1, PublicationYear = 2009, Read = true},
                new Book { Isbn = "9781911508755", Title = "Permafrost", AuthorId = 5, Translator = "Julia Sanches", Language = "English", OriginalLanguage = "Catalan", CollectionId = 1, PublicationYear = 2021, Read = true},
                new Book { Isbn = "9781805223047", Title = "Eurotrash", AuthorId = 6, Translator = "Daniel Bowles", Language = "English", OriginalLanguage = "German", CollectionId = 1, PublicationYear = 2024, Read = true, Notes = "International Booker Prize shortlistee 2025"},
                new Book { Isbn = "9781473613577", Title = "Venomous Lumpsucker", AuthorId = 7, Language = "English", CollectionId = 1, PublicationYear = 2022, Read = true},
                new Book { Isbn = "9780586092262", Title = "London Observed", Subtitle = "Stories and Sketches", AuthorId = 8, Language = "English", CollectionId = 1, PublicationYear = 1992, Read = true},
                new Book { Isbn = "9781910695593", Title = "The Books of Jacob", AuthorId = 9, Translator = "Jennifer Croft", Language = "English", OriginalLanguage = "Polish", CollectionId = 1, PublicationYear = 2021, Read = true},
                new Book { Isbn = "9781908058621", Title = "Witch", AuthorId = 10, Language = "English", CollectionId = 3, PublicationYear = 2019, Read = true},
                new Book { Isbn = "9780393356250", Title = "The Odyssey", AuthorId = 11, Translator = "Emily Wilson", Language = "English", OriginalLanguage = "Greek", CollectionId = 3, PublicationYear = 2018, Read = true},
                new Book { Isbn = "9780349015903", Title = "The Fran Lebowitz Reader", AuthorId = 12, Language = "English", CollectionId = 2, PublicationYear = 1994, Read = true},
                new Book { Isbn = "9781903436592", Title = "King Lear", AuthorId = 13, Language = "English", CollectionId = 5, PublicationYear = 1608, Read = true},
                new Book { Isbn = "9781903436332", Title = "King Richard II", AuthorId = 13, Language = "English", CollectionId = 5, PublicationYear = 1353, Read = true},
                new Book { Isbn = "9781804271049", Title = "Perfection", AuthorId = 14, Translator = "Sophie Hughes", Language = "English", OriginalLanguage = "Italian", CollectionId = 1, PublicationYear = 2025, Read = true},
                new Book { Isbn = "9781914391170", Title = "The Trees", AuthorId = 15, Language = "English", CollectionId = 1, PublicationYear = 2021, Read = true},
                new Book { Isbn = "9781783786138", Title = "Kairos", AuthorId = 16, Translator = "Michael Hofmann", Language = "English", OriginalLanguage = "German", CollectionId = 1, PublicationYear = 2023, Read = true, Notes = "International Booker Prize winner 2024"},
                new Book { Isbn = "9781916277182", Title = "Cursed Bunny", AuthorId = 17, Translator = "Anton Hur", Language = "English", OriginalLanguage = "Korean", CollectionId = 1, PublicationYear = 2021, Read = true},
                new Book { Isbn = "9780571357567", Title = "The Premonitions Bureau", AuthorId = 18, Language = "English", CollectionId = 2, PublicationYear = 2022, Read = true},
                new Book { Isbn = "9781911547747", Title = "Real Life", AuthorId = 19, Language = "English", CollectionId = 1, PublicationYear = 2020, Read = true},
                new Book { Isbn = "9780330369954", Title = "Underworld", AuthorId = 20, Language = "English", CollectionId = 1, PublicationYear = 1997, Read = true},
                new Book { Isbn = "9781803512358", Title = "Under the Eye of the Big Bird", AuthorId = 21, Translator = "Asa Yoneda", Language = "English", OriginalLanguage = "Japanese", CollectionId = 1, PublicationYear = 2024,Read = true, Notes = "International Booker Prize shortlistee 2025"},
                new Book { Isbn = "9780415014144", Title = "King Henry V", AuthorId = 13, Language = "English", CollectionId = 5, PublicationYear = 1623, Read = true},
                new Book { Isbn = "9780241352540", Title = "Death in Spring", AuthorId = 22, Translator = "Martha Tennent", Language = "English", OriginalLanguage = "Catalan", CollectionId = 1, PublicationYear = 2009, Read = true},
                new Book { Isbn = "9781844085514", Title = "A Far Cry from Kensington", AuthorId = 23, Language = "English", CollectionId = 1, PublicationYear = 1988, Read = true},
                new Book { Isbn = "9781844080816", Title = "If Not, Winter", Subtitle = "Fragments of Sappho", AuthorId = 24, Translator = "Anne Carson", Language = "English", OriginalLanguage = "Greek", CollectionId = 3, PublicationYear = 2002, Read = true},
                new Book { Isbn = "9781593766580", Title = "Jane", Subtitle = "A Murder", AuthorId = 25, Language = "English", CollectionId = 3, PublicationYear = 2005, Read = true},
            ];
            await context.Set<Book>().AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}