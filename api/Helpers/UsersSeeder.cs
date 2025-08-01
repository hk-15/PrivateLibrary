using Microsoft.AspNetCore.Identity;

namespace PersonalLibrary.Helpers;

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

        var userExist = await userManager.FindByEmailAsync(adminEmail);

        if (userExist == null)
        {
            var adminUser = new IdentityUser
            {
                UserName = adminEmail,
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
    }
}