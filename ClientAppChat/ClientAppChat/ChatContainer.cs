﻿using ClientAppChat.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Printing;
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
    public partial class ChatContainer : Form
    {
        public User user;
        public Conversation conversation;
        public Socket client;
        Thread trd;
        public Action action;
        FormSignIn f;
        CreateConversation fCreateConversation;
        AddMember fAddMember;

        public ChatContainer(User user, Socket client, FormSignIn f)
        {
            this.user = user;
            this.client = client;
            this.f = f;
            action = new Action(client);
            InitializeComponent();
            this.FormClosing += Form_Closing;
            LableName.Text = user.Name;
            trd = new Thread(new ThreadStart(this.ThreadTask));
            trd.IsBackground = true;
            trd.Start();
        }
        private void ThreadTask()
        {
            bool exit = false;
            while (!exit)
            {
                byte[] data = new byte[20480];
                int recv = client.Receive(data);
                if (recv == 0) return;
                string jsonString = Encoding.ASCII.GetString(data, 0, recv);
                Response res = JsonSerializer.Deserialize<Response>(jsonString);
                //MessageBox.Show("Res action : " + res.action + "\nRes success : " + res.success + "\nRes data : " + res.data, "");
                if (res != null)
                {
                    switch (res.action)
                    {
                        case "CreateConversation":
                            if (res.success)
                            {
                                if(fCreateConversation != null)
                                {
                                    MessageBox.Show(res.message, "");
                                    fCreateConversation.BeginInvoke(new MethodInvoker(() =>
                                    {
                                        fCreateConversation.Close();
                                    }));
                                }
                                this.getListConversation();
                            }
                            else MessageBox.Show("Fail!\n" + res.message, "Error");
                            break;
                        case "AddMember":
                            if (res != null)
                            {
                                if (res.success)
                                {
                                    MessageBox.Show(res.message, "");
                                    fAddMember.BeginInvoke(new MethodInvoker(() =>
                                    {
                                        fAddMember.Close();
                                    }));
                                }
                                else MessageBox.Show("Fail!\n" + res.message, "Error");
                            }
                            else MessageBox.Show("Missing response", "Error");
                            break;
                        case "GetConversationById":
                            if (res.success)
                            {
                                conversation = JsonSerializer.Deserialize<Conversation>(res.data);
                                renderMessages(conversation);
                            }
                            else MessageBox.Show("Fail!\n" + res.message, "Error");
                            break;
                        case "GetConversationByIdUser":
                            if (res.success)
                            {
                                //MessageBox.Show(res.data, "");
                                renderListConversation(res.data);
                            }
                            else MessageBox.Show("Fail!\n" + res.message, "Error");
                            break;
                        case "SendMessage":
                            if (res.success)
                            {
                                Models.Message message = JsonSerializer.Deserialize<Models.Message>(res.data);
                                if (conversation.Id == message.ConversationId)
                                {
                                    if (message.user.Id == user.Id)
                                    {
                                        MessageUI2 ui = new MessageUI2(message);
                                        flowLayoutMessage.BeginInvoke(new MethodInvoker(() =>
                                        {
                                            flowLayoutMessage.Controls.Add(ui);
                                            flowLayoutMessage.ScrollControlIntoView(ui);
                                        }));
                                    }
                                    else
                                    {
                                        MessageUI ui = new MessageUI(message);
                                        flowLayoutMessage.BeginInvoke(new MethodInvoker(() =>
                                        {
                                            flowLayoutMessage.Controls.Add(ui);
                                            flowLayoutMessage.ScrollControlIntoView(ui);
                                        }));
                                    }
                                }
                            }
                            else MessageBox.Show("Fail!\n" + res.message, "Error");
                            break;
                        case "Exit":
                            exit = true;
                            break;
                    }
                }
                else MessageBox.Show("Null response", "Error");
            }
        }
        public void getListConversation()
        {
            action.GetConversationByIdUser(user.Id);
        }
        public void renderListConversation(string data)
        {
            flowLayoutPanel.BeginInvoke(new MethodInvoker(() =>
            {
                flowLayoutPanel.Controls.Clear();
                flowLayoutPanel.Padding = new Padding(5);
                btnAddMember.Enabled = false;
                btnSend.Enabled = false;
                LabelConversation.AutoSize = false;
                LabelConversation.TextAlign = ContentAlignment.MiddleRight;
            }));
            List<Conversation> conversations = new List<Conversation>();
            conversations = JsonSerializer.Deserialize<List<Conversation>>(data);
            foreach (var conversation in conversations)
            {
                Label label = new Label();
                label.Size = new Size(180, 40);
                label.Padding = new Padding(10);
                label.Cursor = Cursors.Hand;
                label.AutoSize = false;
                label.TextAlign = ContentAlignment.MiddleLeft;
                label.Name = conversation.Id.ToString();
                label.Text = conversation.Name;
                label.Click += onClick;
                label.MouseEnter += onEnter;
                label.MouseLeave += onLeave;
                flowLayoutPanel.BeginInvoke(new MethodInvoker(() =>
                {
                    flowLayoutPanel.Controls.Add(label);
                }));
            }
        }

        public void renderMessages(Conversation conversation)
        {
            flowLayoutMessage.BeginInvoke(new MethodInvoker(() =>
            {
                flowLayoutMessage.Controls.Clear();
                txtMessage.Focus();
                LabelConversation.Text = conversation.Name;
                btnAddMember.Enabled = true;
                btnSend.Enabled = true;
            }));
            foreach (var message in conversation.messages)
            {
                if (message.user.Id == user.Id)
                {
                    MessageUI2 ui = new MessageUI2(message);
                    flowLayoutMessage.BeginInvoke(new MethodInvoker(() =>
                    {
                        flowLayoutMessage.Controls.Add(ui);
                        flowLayoutMessage.ScrollControlIntoView(ui);
                    }));
                }
                else
                {
                    MessageUI ui = new MessageUI(message);
                    flowLayoutMessage.BeginInvoke(new MethodInvoker(() =>
                    {
                        flowLayoutMessage.Controls.Add(ui);
                        flowLayoutMessage.ScrollControlIntoView(ui);
                    }));
                }
            }
        }

        private void onClick(object sender, EventArgs e)
        {
            Label label = (Label)sender;
            //Response res = action.GetConversationById(int.Parse(label.Name));
            action.GetConversationById(int.Parse(label.Name));
        }
        private void onEnter(object sender, EventArgs e)
        {
            Label label = (Label)sender;
            label.BackColor = SystemColors.ButtonFace; // or Color.Red or whatever you want
        }
        private void onLeave(object sender, EventArgs e)
        {
            Label label = (Label)sender;
            label.BackColor = SystemColors.Window; // or Color.Red or whatever you want
        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void btnCreate_Click(object sender, EventArgs e)
        {
            fCreateConversation = new CreateConversation(user, client);
            fCreateConversation.Show();
        }

        private void btnAddMember_Click(object sender, EventArgs e)
        {
            fAddMember = new AddMember(conversation, client);
            fAddMember.Show();
        }

        private void LabelConversation_Click(object sender, EventArgs e)
        {

        }

        private void ChatContainer_Load(object sender, EventArgs e)
        {
            getListConversation();
        }

        private void Form_Closing(Object sender, FormClosingEventArgs e)
        {
            action.Exit();
            f.Close();
        }

        private void btnSend_Click(object sender, EventArgs e)
        {
            if (txtMessage.Text != "")
            {
                action.SendMessage(conversation.Id, user, txtMessage.Text);
                txtMessage.Text = "";
            }
            else
            {
                MessageBox.Show("Please enter name", "Notice");
            }
        }
    }
}
