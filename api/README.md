# Private Library API
The Private Library API is a controller-based ASP.NET api.
# Getting Started
First, navigate to the ./api directory in the project repo.
## Installing dependencies
To install dependencies, run `dotnet restore`.
## Setting up the database
First, create a new role in pgAdmin called `private_library` with password `private_library` and the following privileges:
- Can login
- Create databases
- Inherit rights from the parent roles

If no migrations exist, create one by running `dotnet ef migrations add InitialCreate`.
To update the database, run `dotnet ef database update`.

You can check that this has worked by right clicking on 'Databases' in pgAdmin and then clicking 'refresh'.

# .NET Identity
The project is already set up to use DotNet Identity. Key packages for Identity are:
* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.AspNetCore.Identity.UI
Running `dotnet restore` should have installed these dependencies but if not, add these packages.

The project is currently supporting 2 Identity roles: 'User' and 'Admin'. The [Authorize] attribute is to be used on endpoints where only logged in users should have access.
For admin-only endpoints use this attribute: [Authorize(Roles = "Admin")]

# Running the code
You can run the code using `dotnet run`.