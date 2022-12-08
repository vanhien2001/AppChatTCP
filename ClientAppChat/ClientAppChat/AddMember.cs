using ClientAppChat.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
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
            txtCreatedBy.Text = conversation.user.Name;
            txtCreatedBy.ReadOnly = true;
            txtDateCreate.Text = conversation.dateCreate.ToString("HH:mm tt dd/MM/yyyy");
            txtDateCreate.ReadOnly = true;
            txtEmail.Focus();
            this.client = client;
            renderListMembers(conversation);
        }

        public void renderListMembers(Conversation data)
        {
            if (InvokeRequired)
            {
                try { this.Invoke(new Action<Conversation>(renderListMembers), new object[] { data }); }
                catch (Exception) { }
                return;
            }
            flowLayoutPanel1.Controls.Clear();
            flowLayoutPanel1.Padding = new Padding(5);
            foreach (var members in data.groupMembers)
            {
                Label label = new Label();
                label.Size = new Size(280, 40);
                label.Padding = new Padding(10);
                label.AutoSize = false;
                label.TextAlign = ContentAlignment.MiddleLeft;
                label.Text = members.user.Name + " -  Date join : " + members.date.ToString("HH:mm tt dd/MM/yyyy");
                flowLayoutPanel1.Controls.Add(label);
            }
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


        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void AddMember_Load(object sender, EventArgs e)
        {

        }
    }
}
