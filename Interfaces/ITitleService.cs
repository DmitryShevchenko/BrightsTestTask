using System.Threading.Tasks;
using TestTask.Models;

namespace TestTask.Interfaces
{
    public interface ITitleService
    {
        Task<Response> GetTitleByUrl(string url);
    }
}