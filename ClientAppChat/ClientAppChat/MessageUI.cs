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
    public partial class MessageUI : UserControl
    {
        Message message;
        public MessageUI(Message message)
        {
            this.message = message;
            InitializeComponent();
            labelName.Text = message.user.Name + " (" + message.Date.ToString("HH:mm tt dd/MM/yyyy") +") :";
            labelText.Text = message.Text;
        }

        private void labelText_Click(object sender, EventArgs e)
        {

        }

        private void labelName_Click(object sender, EventArgs e)
        {

        }
    }
}
