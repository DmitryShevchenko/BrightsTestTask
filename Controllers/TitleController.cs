using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTask.Context;
using TestTask.Interfaces;
using TestTask.Models;

namespace TestTask.Controllers
{
    [Route("api/[controller]")]
    public class TitleController : Controller
    {
        private readonly ITitleService _titleService;
        private readonly AppDbContext _db;

        public TitleController(ITitleService titleService, AppDbContext appDbContext)
        {
            _titleService = titleService;
            _db = appDbContext;
        }


        [HttpPost("[action]")]
        public async Task<List<Response>> PostTitleData([FromBody] string[] data)
        {
            var responses = new List<Response>();
            var tasks = data.Select(async url =>
            {
                responses.Add(await _titleService.GetTitleByUrl(url));
            });
            await Task.WhenAll(tasks);
            await _db.Responses.AddRangeAsync(responses);
            await _db.SaveChangesAsync();
            return responses;
        }

        [HttpGet("[action]")]
        public async Task<List<Response>> GetAllTitleData() => await _db.Responses.ToListAsync();


        [HttpDelete("[action]")]
        public async Task<IActionResult> ClearDb()
        {
            _db.Responses.RemoveRange(_db.Responses.Select(x => x));
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}