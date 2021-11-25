using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities
{
    [Table("Enemy")]
    public class Enemy
    {
        public int Id { get; set; }

        public string EnemyName { get; set; } 

        public int Level { get; set; } 

        public int HpMax { get; set; }

        public int HpCurrent { get; set; }

        public int Damage { get; set; }

        public int Accuracy { get; set; }

        public int Armour { get; set; }

        public int Evasion { get; set; }

        public int CritChance { get; set; }

        public int Gold {get; set;}
        public int Xp {get; set;}
    }
}