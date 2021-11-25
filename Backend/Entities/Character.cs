using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace Backend.Entities
{
    [Table("Characters")]
    public class Character
    {
        public int Id { get; set; }

        public int Level { get; set; } = 1;

        public int HpMax { get; set; } = 100;

        public int HpCurrent { get; set; } = 100;

        public int XpMax { get; set; } = 100;

        public int XpCurrent { get; set; } = 0;

        public int Damage { get; set; } = 5;

        public int Accuracy { get; set; } = 1000;

        public int Armour { get; set; } = 0;

        public int Evasion { get; set; } = 0;

        public int CritChance { get; set; } = 1;

        public string PublicId { get; set; }

        public AppUser AppUser { get; set; }

        public int AppUserId { get; set; }
    }
}