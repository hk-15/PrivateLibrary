using Microsoft.AspNetCore.Identity;
using PersonalLibrary.Database;
using PersonalLibrary.Helpers;
using PersonalLibrary.Repositories;
using PersonalLibrary.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddDefaultPolicy(policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader();
        });
    }
});

// Add services to the container.
builder.Services.AddDbContext<PersonalLibraryDbContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<IAuthorsRepo, AuthorsRepo>();
builder.Services.AddScoped<IBooksRepo, BooksRepo>();
builder.Services.AddScoped<ICollectionsRepo, CollectionsRepo>();
builder.Services.AddScoped<ITagsRepo, TagsRepo>();
builder.Services.AddScoped<IAuthorsService, AuthorsService>();
builder.Services.AddScoped<IBooksService, BooksService>();
builder.Services.AddScoped<ICollectionsService, CollectionsService>();
builder.Services.AddScoped<ITagsService, TagsService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder
    .Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<PersonalLibraryDbContext>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider;
    await UsersSeeder.SeedUsers(context);
    await DatabaseSeeder.SeedDatabase(context);
}
;

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();