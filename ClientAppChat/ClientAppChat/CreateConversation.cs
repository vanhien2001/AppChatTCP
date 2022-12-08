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
            txtInfor.GotFocus += txtInforFocus;
            txtName.GotFocus += txtNameFocus;
        }

        private void btnCreate_Click(object sender, EventArgs e)
        {
            if (txtName.Text == "" && txtInfor.Text == "")
            {
                MessageBox.Show("Please enter name or infor user", "Notice");
            }
            else
            {
                Action action = new Action(client);
                if (txtName.Text == "")
                {
                    action.CreateConversationPrivate(user.Id, txtInfor.Text);
                } else if (txtInfor.Text == "")
                {
                    action.CreateConversation(txtName.Text, user);
                }
            }
        }

        private void txtNameFocus(object sender, EventArgs e)
        {
            txtInfor.Text = "";
        }

        private void txtInforFocus(object sender, EventArgs e)
        {
            txtName.Text = "";
        }
    }
}
