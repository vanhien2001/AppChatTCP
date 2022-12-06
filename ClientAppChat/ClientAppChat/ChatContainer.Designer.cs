namespace ClientAppChat
{
    partial class ChatContainer
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.LableName = new System.Windows.Forms.Label();
            this.txtMessage = new System.Windows.Forms.TextBox();
            this.btnSend = new System.Windows.Forms.Button();
            this.LabelConversation = new System.Windows.Forms.Label();
            this.btnCreate = new System.Windows.Forms.Button();
            this.btnAddMember = new System.Windows.Forms.Button();
            this.flowLayoutPanel = new System.Windows.Forms.FlowLayoutPanel();
            this.flowLayoutMessage = new System.Windows.Forms.FlowLayoutPanel();
            this.SuspendLayout();
            // 
            // LableName
            // 
            this.LableName.AutoSize = true;
            this.LableName.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.LableName.Location = new System.Drawing.Point(12, 9);
            this.LableName.Name = "LableName";
            this.LableName.Size = new System.Drawing.Size(64, 28);
            this.LableName.TabIndex = 0;
            this.LableName.Text = "Name";
            // 
            // txtMessage
            // 
            this.txtMessage.Location = new System.Drawing.Point(254, 411);
            this.txtMessage.Name = "txtMessage";
            this.txtMessage.Size = new System.Drawing.Size(457, 27);
            this.txtMessage.TabIndex = 1;
            this.txtMessage.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // btnSend
            // 
            this.btnSend.Location = new System.Drawing.Point(717, 409);
            this.btnSend.Name = "btnSend";
            this.btnSend.Size = new System.Drawing.Size(94, 29);
            this.btnSend.TabIndex = 2;
            this.btnSend.Text = "Send";
            this.btnSend.UseVisualStyleBackColor = true;
            this.btnSend.Click += new System.EventHandler(this.btnSend_Click);
            // 
            // LabelConversation
            // 
            this.LabelConversation.AutoSize = true;
            this.LabelConversation.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.LabelConversation.Location = new System.Drawing.Point(627, 9);
            this.LabelConversation.Name = "LabelConversation";
            this.LabelConversation.Size = new System.Drawing.Size(184, 28);
            this.LabelConversation.TabIndex = 4;
            this.LabelConversation.Text = "Name Conversation";
            this.LabelConversation.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.LabelConversation.Click += new System.EventHandler(this.LabelConversation_Click);
            // 
            // btnCreate
            // 
            this.btnCreate.Location = new System.Drawing.Point(12, 411);
            this.btnCreate.Name = "btnCreate";
            this.btnCreate.Size = new System.Drawing.Size(222, 27);
            this.btnCreate.TabIndex = 5;
            this.btnCreate.Text = "Create Conversation";
            this.btnCreate.UseVisualStyleBackColor = true;
            this.btnCreate.Click += new System.EventHandler(this.btnCreate_Click);
            // 
            // btnAddMember
            // 
            this.btnAddMember.Location = new System.Drawing.Point(254, 12);
            this.btnAddMember.Name = "btnAddMember";
            this.btnAddMember.Size = new System.Drawing.Size(115, 29);
            this.btnAddMember.TabIndex = 6;
            this.btnAddMember.Text = "Add Member";
            this.btnAddMember.UseVisualStyleBackColor = true;
            this.btnAddMember.Click += new System.EventHandler(this.btnAddMember_Click);
            // 
            // flowLayoutPanel
            // 
            this.flowLayoutPanel.AutoScroll = true;
            this.flowLayoutPanel.BackColor = System.Drawing.SystemColors.Window;
            this.flowLayoutPanel.Location = new System.Drawing.Point(12, 56);
            this.flowLayoutPanel.Name = "flowLayoutPanel";
            this.flowLayoutPanel.Padding = new System.Windows.Forms.Padding(1);
            this.flowLayoutPanel.Size = new System.Drawing.Size(222, 335);
            this.flowLayoutPanel.TabIndex = 7;
            // 
            // flowLayoutMessage
            // 
            this.flowLayoutMessage.AutoScroll = true;
            this.flowLayoutMessage.BackColor = System.Drawing.SystemColors.Window;
            this.flowLayoutMessage.Location = new System.Drawing.Point(254, 56);
            this.flowLayoutMessage.Name = "flowLayoutMessage";
            this.flowLayoutMessage.Size = new System.Drawing.Size(557, 335);
            this.flowLayoutMessage.TabIndex = 8;
            // 
            // ChatContainer
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(848, 465);
            this.Controls.Add(this.flowLayoutMessage);
            this.Controls.Add(this.flowLayoutPanel);
            this.Controls.Add(this.btnAddMember);
            this.Controls.Add(this.btnCreate);
            this.Controls.Add(this.LabelConversation);
            this.Controls.Add(this.btnSend);
            this.Controls.Add(this.txtMessage);
            this.Controls.Add(this.LableName);
            this.Name = "ChatContainer";
            this.Text = "ChatContainer";
            this.Load += new System.EventHandler(this.ChatContainer_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label LableName;
        private TextBox txtMessage;
        private Button btnSend;
        private Label LabelConversation;
        private Button btnCreate;
        private Button btnAddMember;
        private FlowLayoutPanel flowLayoutPanel;
        private FlowLayoutPanel flowLayoutMessage;
    }
}