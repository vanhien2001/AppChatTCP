using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientAppChat.Models
{
    public class Request
    {
        public Request(string action, string data)
        {
            this.action = action;
            this.data = data;
        }
        public string action { get; set; }
        public string data { get; set; }
    }
}
