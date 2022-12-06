using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ClientAppChat.Models;

namespace ClientAppChat
{
    public partial class CreateConversation : Form
    {
        User user;
        Socket client;
        public CreateConversation(User user, Socket client)
        {
            this.user = user;
            this.client = client;
            InitializeComponent();
        }

        private void btnCreate_Click(object sender, EventArgs e)
        {
            if (txtName.Text != "")
            {
                Action action = new Action(client);
                action.CreateConversation(txtName.Text, user);
            }
            else
            {
                MessageBox.Show("Please enter name", "Notice");
            }
        }
    }
}
