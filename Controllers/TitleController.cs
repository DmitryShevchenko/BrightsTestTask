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
            var responses = new ConcurrentBag<Response>();
            var tasks = data.Select(async url =>
            {
                var item = await _titleService.GetTitleByUrl(url);
                _db.Responses.Add(item);
                responses.Add(item);
            });
            await Task.WhenAll(tasks);
            await _db.SaveChangesAsync();
            return responses.ToList();
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