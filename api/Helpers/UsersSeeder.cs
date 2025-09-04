using Microsoft.AspNetCore.Identity;
using api.Models.Database;

namespace api.Helpers;

public static class UsersSeeder
{
    public static async Task SeedUsers(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        string[] roles = ["Admin", "User"];

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

        var adminEmail = "admin@admin.com";
        var adminPassword = "Admin@123";
        var userEmail = "user@user.com";
        var userPassword = "User@123";

        var adminExists = await userManager.FindByEmailAsync(adminEmail);
        var userExists = await userManager.FindByEmailAsync(userEmail);

        if (adminExists == null)
        {
            var adminUser = new IdentityUser
            {
                UserName = "Admin",
                Email = adminEmail,
                EmailConfirmed = true
            };

            var adminCreation = await userManager.CreateAsync(adminUser, adminPassword);
            if (adminCreation.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
            else
            {
                throw new Exception("Failed to create the admin user: " + string.Join(", ", adminCreation.Errors));
            }
        }
        
        if (userExists == null)
        {
            var user = new IdentityUser
            {
                UserName = "User",
                Email = userEmail,
                EmailConfirmed = true
            };

            var userCreation = await userManager.CreateAsync(user, userPassword);

            if (userCreation.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "User");
            }
            else
            {
                throw new Exception("Failed to create the user: " + string.Join(", ", userCreation.Errors));
            }
        }
    }
}