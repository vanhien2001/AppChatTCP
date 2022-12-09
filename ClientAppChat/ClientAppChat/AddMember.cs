using ClientAppChat.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Reflection.Emit;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;
using Label = System.Windows.Forms.Label;

namespace ClientAppChat
{
    public partial class AddMember : Form
    {
        Conversation conversation;
        Socket client;
        public List<int> listClientConnect;
        public AddMember(Conversation conversation, List<int> listClientConnect, Socket client)
        {
            this.conversation = conversation;
            this.listClientConnect = listClientConnect;
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
                Label label1 = new Label();
                Button btn = new Button();
                btn.Size = new Size(60, 40);
                btn.Name = members.Id.ToString();
                btn.AutoSize = false;
                btn.TextAlign = ContentAlignment.MiddleCenter;
                btn.Text = "Kick";
                btn.Cursor = Cursors.Hand;
                btn.Click += btnDelete_Click;
                label.Size = new Size(380, 40);
                label.Padding = new Padding(10);
                label.AutoSize = false;
                label.TextAlign = ContentAlignment.MiddleLeft;
                label.Text = members.user.Name + " " + members.date.ToString("HH:mm tt dd/MM/yyyy");
                label1.Size = new Size(80, 40);
                label1.Padding = new Padding(10);
                label1.AutoSize = false;
                label1.TextAlign = ContentAlignment.MiddleCenter;
                label1.Text = listClientConnect.Contains(members.user.Id) ? "Online" : "Offline";
                flowLayoutPanel1.Controls.Add(label);
                flowLayoutPanel1.Controls.Add(label1);
                flowLayoutPanel1.Controls.Add(btn);
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            DialogResult dr = MessageBox.Show("Are you sure", "Confirm", MessageBoxButtons.YesNoCancel, MessageBoxIcon.Information);

            if (dr == DialogResult.Yes)
            {
                Button btn = (Button)sender;
                Action action = new Action(client);
                action.DeleteMember(int.Parse(btn.Name));
            }
            else if (dr == DialogResult.Cancel)
            {
                //
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

        private void label4_Click(object sender, EventArgs e)
        {

        }
    }
}
