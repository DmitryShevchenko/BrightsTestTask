using System;

namespace TestTask.Models
{
    public class Response
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public int StatusCode { get; set; }
    }
}