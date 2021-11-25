using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var monsterData = await System.IO.File.ReadAllTextAsync("Data/MonsterSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            var monsters = JsonSerializer.Deserialize<List<Enemy>>(monsterData);
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("test"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }
            foreach (var monster in monsters)
            {
                context.Monsters.Add(monster);
            }

            await context.SaveChangesAsync();
        }
    }
}