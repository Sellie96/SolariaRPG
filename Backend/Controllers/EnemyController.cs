using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class EnemyController : BaseAPiController
    {
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;
        public EnemyController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enemy>>> GetMonsters()
        {
            var users = await _userRepository.GetMonstersAsync();
            return Ok(users);
        }


        // api/users/3
        [HttpGet("{monsterName}")]
        public async Task <ActionResult<Enemy>> GetMonster(string monsterName)
        {
            return await _userRepository.GetMonsterAsync(monsterName);
        }
    }
}