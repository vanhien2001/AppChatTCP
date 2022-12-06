using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class Response
    {
        public Response(string action, bool success, string message, string data)
        {
            this.action = action;
            this.success = success;
            this.message = message;
            this.data = data;
        }
        public string action { get; set; }
        public bool success { get; set; }
        public string? message { get; set; }
        public string? data { get; set; }
    }
}
