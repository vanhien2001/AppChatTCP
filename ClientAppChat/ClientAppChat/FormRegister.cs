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
    public partial class FormRegister : Form
    {
        Socket client;
        IPEndPoint iep;
        string IP= "192.168.1.127", Port = "6969";
        public FormRegister()
        {
            InitializeComponent();
            Connect();
        }

        private void Connect()
        {
            //string hostName = Dns.GetHostName();
            //Console.WriteLine(hostName);
            //foreach (IPAddress ip in Dns.GetHostByName(hostName).AddressList)
            //{
            //    if (ip.ToString().Contains("."))
            //    {
            //        IP = ip.ToString();
            //        break;
            //    }
            //}
            iep = new IPEndPoint(IPAddress.Parse(IP), int.Parse(Port));
            client = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            client.Connect(iep);
        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void FormRegister_Load(object sender, EventArgs e)
        {

        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            FormSignIn f = new FormSignIn();
            f.ShowDialog();
            //this.Close();
        }

        private void btnRegister_Click(object sender, EventArgs e)
        {
            if (txtUsername.Text != "" || txtPassword.Text != "" || txtPhone.Text != "" || txtName.Text != "" || txtPhone.Text != "")
            {
                Action action = new Action(client);
                Response res = action.Register(new User(txtName.Text, txtUsername.Text, txtPassword.Text, txtPhone.Text, txtPhone.Text));
                if (res != null)
                {
                    if (res.success)
                    {
                        MessageBox.Show(res.message, "");
                        client.Close();
                        this.Close();
                    }
                    else MessageBox.Show("Register fail!\n" + res.message, "Error");
                }
                else MessageBox.Show("Missing response", "Error");
            }
            else
            {
                MessageBox.Show("Please enter username and password!", "Notice");
            }
        }
    }
}
