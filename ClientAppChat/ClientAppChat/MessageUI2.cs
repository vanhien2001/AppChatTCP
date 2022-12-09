using ClientAppChat.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Message = ClientAppChat.Models.Message;

namespace ClientAppChat
{
    public partial class MessageUI2 : UserControl
    {
        Message message;
        public MessageUI2(Message message)
        {
            this.message = message;
            InitializeComponent();
            labelName.Text = "Bạn (" + message.Date.ToString("HH:mm tt dd/MM/yyyy") + ") :";
            labelText.Text = message.Text;
            //labelText.AutoSize = false;
            labelText.TextAlign = ContentAlignment.MiddleRight;
        }
    }
}
