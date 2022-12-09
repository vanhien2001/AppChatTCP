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

namespace ClientAppChat
{
    public partial class UserInfor : Form
    {
        User user;
        Socket client;
        public UserInfor(User user, Socket client)
        {
            this.user = user;
            this.client = client;
            InitializeComponent();
            updateInfor(user);
        }

        public void updateInfor(User user)
        {
            txtEmail.Text = user.Email;
            txtName.Text = user.Name;
            txtPhone.Text = user.PhoneNumber;
            txtUsername.Text = user.UserName;
            txtUsername.ReadOnly = true;
        }

        private void btnEdit_Click(object sender, EventArgs e)
        {
            if (txtEmail.Text == "" || txtName.Text == "" || txtPhone.Text == "")
            {
                MessageBox.Show("Emty information !");
            }
            else
            {
                Action action = new Action(client);
                action.UpdateUserInfor(new User(user.Id, txtName.Text, user.UserName, user.Password, txtPhone.Text, txtEmail.Text));
            }
        }
    }
}
