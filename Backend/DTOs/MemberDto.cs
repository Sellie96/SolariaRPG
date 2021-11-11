using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
         
        public string KnownAs { get; set; }

        public DateTime Created { get; set; }

         public DateTime LastActive { get; set; }

         public string GameMode { get; set; }

        //  public ICollection<PhotoDto> Photos { get; set; }

    }
}