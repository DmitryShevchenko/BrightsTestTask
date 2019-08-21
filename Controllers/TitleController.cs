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
            var responseList = new List<Response>();

            Parallel.ForEach(data, (url) => { responseList.Add( _titleService.GetTitleByUrl(url).Result); });
            responseList.ForEach(item => 
            {
                _db.Responses.Add(new Response()
                    {StatusCode = item.StatusCode, Url = item.Url, Title = item.Title});
            });
            await _db.SaveChangesAsync();
            return responseList;
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