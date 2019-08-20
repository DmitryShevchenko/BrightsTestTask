using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TestTask.Interfaces;
using TestTask.Models;

namespace TestTask.Services
{
    public class TitleService : ITitleService
    {
        public async Task<Response> GetTitleByUrl(string url)
        {
            try
            {
                var response = new Response();
                using (var client = new HttpClient())
                {
                    var httpResponse = await client.GetAsync(url);
                    var htmlPage = await httpResponse.Content.ReadAsStringAsync();
                    response.Title = new Regex("<title>(?<Title>.*?)</title>").Match(htmlPage).Groups["Title"].Value;
                    response.Url = url;
                    response.StatusCode = (int)httpResponse.StatusCode;
                }
                return response;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return new Response();
            }
        }
    }
}