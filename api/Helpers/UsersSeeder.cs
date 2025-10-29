using Microsoft.AspNetCore.Identity;

namespace api.Helpers;

public static class UsersSeeder
{
    public static async Task SeedUsers(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        string[] roles = ["Demo", "User", "Admin"];

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

        var demoEmail = "demo@demo.com";
        var demoPassword = "Demo@123";

        var demoExists = await userManager.FindByEmailAsync(demoEmail);
        
        if (demoExists == null)
        {
            var demo = new IdentityUser
            {
                UserName = "Demo",
                Email = demoEmail,
                EmailConfirmed = true
            };

            var userCreation = await userManager.CreateAsync(demo, demoPassword);

            if (userCreation.Succeeded)
            {
                await userManager.AddToRoleAsync(demo, "Demo");
            }
            else
            {
                throw new Exception("Failed to create the user: " + string.Join(", ", userCreation.Errors));
            }
        }
    }
}