using ClientAppChat.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;

namespace ClientAppChat
{
    public partial class AddMember : Form
    {
        Conversation conversation;
        Socket client;
        public AddMember(Conversation conversation, Socket client)
        {
            this.conversation = conversation;
            InitializeComponent();
            txtNameConversation.Text = conversation.Name;
            txtNameConversation.ReadOnly = true;
            this.client = client;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (txtEmail.Text != "")
            {
                Action action = new Action(client);
                action.AddMember(conversation.Id, txtEmail.Text);
            }
            else
            {
                MessageBox.Show("Please enter name", "Notice");
            }
        }
    }
}
