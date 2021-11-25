namespace API.DTOs
{
    public class CharacterDto
    {
        public int Id { get; set; }

        public int Level { get; set; }

        public int HpMax { get; set; }

        public int HpCurrent { get; set; }

        public int XpMax { get; set; }

        public int XpCurrent { get; set; }

        public int Damage { get; set; }

        public int Accuracy { get; set; }

        public int Armour { get; set; }

        public int Evasion { get; set; }

        public int CritChance { get; set; }
    }
}