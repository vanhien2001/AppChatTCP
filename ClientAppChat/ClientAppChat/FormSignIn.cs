using System.Net.Sockets;
using System.Net;
using System.Text.Json;
using System.Text;
using ClientAppChat.Models;

namespace ClientAppChat
{
    public partial class FormSignIn : Form
    {
        Socket client;
        IPEndPoint iep;
        string IP= "172.31.192.1", Port = "6969";
        public FormSignIn()
        {
            InitializeComponent();
            this.FormClosing += Form_Closing;
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


        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            if(txtUsername.Text != "" || txtPassword.Text != "")
            {
                Connect();
                Action action = new Action(client);
                Response res = action.Login(txtUsername.Text, txtPassword.Text);
                try
                {
                    if (res != null)
                    {
                        if (res.success && res.data != null)
                        {
                            User user = JsonSerializer.Deserialize<User>(res.data);
                            MessageBox.Show(res.message, "");
                            ChatContainer c = new ChatContainer(user, client, this);
                            this.Hide();
                            c.Show();
                        }
                        else MessageBox.Show("Fail!\n" + res.message, "Error");
                    }
                }
                catch (Exception error)
                {
                    MessageBox.Show(error.Message, "Error");
                }
            }
            else
            {
                MessageBox.Show("Please enter username and password!", "Notice");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            FormRegister f = new FormRegister();
            f.ShowDialog();
            //this.Close();
        }

        private void Form_Closing(Object sender, FormClosingEventArgs e)
        {
            client.Close();
        }
    }
}