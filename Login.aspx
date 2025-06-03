<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>تسجيل الدخول - بوابة الدخول الموحد</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'IBM Plex Arabic', sans-serif;
            background: #ffffff;
            min-height: 100vh;
            direction: rtl;
            text-align: right;
        }

        .header {
            background: white;
            padding: 15px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 30px;
        }

        .home-link {
            color: #666;
            text-decoration: none;
            font-size: 16px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .home-link:hover {
            color: #333;
        }

        .main-title {
            color: #333;
            font-size: 24px;
            font-weight: bold;
        }

        .page-title {
            text-align: center;
            color: #333;
            font-size: 28px;
            font-weight: bold;
            margin: 40px 0;
        }

        .login-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            gap: 40px;
            align-items: flex-start;
        }

        .image-section {
            flex: 1;
            text-align: center;
        }

        .image-placeholder {
            width: 300px;
            height: 200px;
            background: #000;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px;
            margin: 0 auto;
        }

        .form-section {
            flex: 1;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .form-title {
            color: #333;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            color: #666;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .form-input {
            width: 100%;
            padding: 12px 45px 12px 15px;
            border: 2px solid #e1e1e1;
            border-radius: 6px;
            font-size: 14px;
            direction: rtl;
            text-align: right;
            transition: border-color 0.3s;
        }

        .form-input:focus {
            outline: none;
            border-color: #4CAF50;
        }

        .input-wrapper {
            position: relative;
        }

        .user-icon, .lock-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            font-size: 16px;
        }

        .forgot-password {
            color: #666;
            text-decoration: none;
            font-size: 12px;
            display: block;
            text-align: center;
            margin: 15px 0;
            transition: color 0.3s;
        }

        .forgot-password:hover {
            color: #333;
        }

        .login-btn {
            width: 100%;
            background: #000;
            color: white;
            padding: 15px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s;
        }

        .login-btn:hover {
            background: #333;
        }

        .login-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .create-account {
            text-align: center;
            margin-top: 20px;
        }

        .create-account-btn {
            background: #000;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s;
        }

        .create-account-btn:hover {
            background: #333;
        }

        .divider {
            text-align: center;
            margin: 20px 0;
            color: #999;
            font-size: 14px;
        }

        .error-message {
            background: #ffebee;
            color: #c62828;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
            display: none;
        }

        .success-message {
            background: #e8f5e8;
            color: #2e7d32;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
            display: none;
        }

        .loading {
            display: none;
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-top: 10px;
        }

        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #333;
            border-radius: 50%;
            animation: spin 2s linear infinite;
            margin-left: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .login-container {
                flex-direction: column;
                gap: 20px;
            }
            
            .image-placeholder {
                width: 100%;
                max-width: 300px;
            }
            
            .form-section {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <!-- Header -->
        <div class="header">
            <div class="header-container">
                <a href="index.html" class="home-link" onclick="goToHome()">الصفحة الرئيسية</a>
                <div class="main-title">تسجيل الدخول</div>
            </div>
        </div>

        <!-- Page Title -->
        <h1 class="page-title">بوابة الدخول الموحد</h1>

        <!-- Main Content -->
        <div class="login-container">
            <!-- Image Section -->
            <div class="image-section">
                <div class="image-placeholder">
                    رابط الصورة
                </div>
            </div>

            <!-- Form Section -->
            <div class="form-section">
                <h2 class="form-title">تسجيل الدخول</h2>

                <!-- Messages -->
                <div id="errorMessage" class="error-message"></div>
                <div id="successMessage" class="success-message"></div>

                <div class="form-group">
                    <label class="form-label">الهوية التنسيقية/العليا/البريد الإلكتروني/اسم المستخدم</label>
                    <div class="input-wrapper">
                        <asp:TextBox ID="txtUsername" runat="server" CssClass="form-input" placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"></asp:TextBox>
                        <span class="user-icon">👤</span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-wrapper">
                        <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" CssClass="form-input" placeholder="أدخل كلمة المرور"></asp:TextBox>
                        <span class="lock-icon">🔒</span>
                    </div>
                </div>

                <a href="#" class="forgot-password" onclick="forgotPassword()">نسيت كلمة المرور</a>

                <asp:Button ID="btnLogin" runat="server" Text="تسجيل دخول" CssClass="login-btn" OnClick="btnLogin_Click" OnClientClick="return validateForm();" />
                
                <div id="loadingMessage" class="loading">
                    <span class="spinner"></span>
                    جاري تسجيل الدخول...
                </div>

                <div class="divider">أو</div>

                <div class="create-account">
                    <a href="#" class="create-account-btn" onclick="createAccount()">إنشاء حساب</a>
                </div>
            </div>
        </div>
    </form>

    <script type="text/javascript">
        // التحقق من صحة النموذج
        function validateForm() {
            var username = document.getElementById('<%= txtUsername.ClientID %>').value.trim();
            var password = document.getElementById('<%= txtPassword.ClientID %>').value.trim();

            // إخفاء الرسائل السابقة
            hideMessages();

            if (username === '') {
                showError('يرجى إدخال اسم المستخدم أو البريد الإلكتروني');
                return false;
            }

            if (password === '') {
                showError('يرجى إدخال كلمة المرور');
                return false;
            }

            if (password.length < 6) {
                showError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                return false;
            }

            // عرض رسالة التحميل
            showLoading();
            return true;
        }

        // عرض رسالة خطأ
        function showError(message) {
            var errorDiv = document.getElementById('errorMessage');
            errorDiv.innerHTML = message;
            errorDiv.style.display = 'block';
        }

        // عرض رسالة نجاح
        function showSuccess(message) {
            var successDiv = document.getElementById('successMessage');
            successDiv.innerHTML = message;
            successDiv.style.display = 'block';
        }

        // إخفاء جميع الرسائل
        function hideMessages() {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('loadingMessage').style.display = 'none';
        }

        // عرض رسالة التحميل
        function showLoading() {
            document.getElementById('loadingMessage').style.display = 'block';
            document.getElementById('<%= btnLogin.ClientID %>').disabled = true;
        }

        // إخفاء رسالة التحميل
        function hideLoading() {
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('<%= btnLogin.ClientID %>').disabled = false;
        }

        // الانتقال للصفحة الرئيسية
        function goToHome() {
            window.location.href = 'index.html';
        }

        // نسيت كلمة المرور
        function forgotPassword() {
            alert('سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
        }

        // إنشاء حساب جديد
        function createAccount() {
            alert('سيتم توجيهك لصفحة إنشاء حساب جديد');
            // يمكنك إضافة رابط صفحة التسجيل هنا
            // window.location.href = 'register.aspx';
        }

        // التحقق من الإدخال أثناء الكتابة
        document.addEventListener('DOMContentLoaded', function () {
            var inputs = document.querySelectorAll('.form-input');
            inputs.forEach(function (input) {
                input.addEventListener('keyup', function () {
                    if (this.value.trim() !== '') {
                        this.style.borderColor = '#4CAF50';
                    } else {
                        this.style.borderColor = '#e1e1e1';
                    }
                });

                // تسجيل الدخول بالضغط على Enter
                input.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        document.getElementById('<%= btnLogin.ClientID %>').click();
                    }
                });
            });
        });
    </script>

    <!-- تحميل قاعدة البيانات -->
    <script src="base.js"></script>
    
    <script runat="server">
        protected void btnLogin_Click(object sender, EventArgs e)
        {
            try
            {
                string username = txtUsername.Text.Trim();
                string password = txtPassword.Text.Trim();
                
                // التحقق الأساسي من البيانات
                if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                {
                    ShowErrorMessage("يرجى إدخال جميع البيانات المطلوبة");
                    return;
                }
                
                // التحقق من صحة بيانات المستخدم
                string jsValidation = GetValidationScript(username, password);
                ClientScript.RegisterStartupScript(this.GetType(), "validateLogin", jsValidation, true);
            }
            catch (Exception ex)
            {
                ShowErrorMessage("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى");
                System.Diagnostics.Debug.WriteLine("Login Error: " + ex.Message);
            }
        }
        
        // عرض رسالة خطأ
        private void ShowErrorMessage(string message)
        {
            ClientScript.RegisterStartupScript(this.GetType(), "showError", 
                "hideLoading(); showError('" + message + "');", true);
        }
        
        // عرض رسالة نجاح
        private void ShowSuccessMessage(string message)
        {
            ClientScript.RegisterStartupScript(this.GetType(), "showSuccess", 
                "hideLoading(); showSuccess('" + message + "');", true);
        }
        
        // وظيفة التحقق من صحة المستخدم (يجب أن تكون في base.js)
        private string GetValidationScript(string username, string password)
        {
            return @"
                // التحقق من صحة بيانات المستخدم
                function validateUserLogin(username, password) {
                    // البحث في defaultUsers عن المستخدم
                    var user = defaultUsers.find(u => 
                        u.username === username || 
                        u.email === username
                    );
                    
                    if (user && user.password === password) {
                        return {
                            success: true,
                            sessionId: 'session_' + Date.now(),
                            user: user,
                            message: 'تم تسجيل الدخول بنجاح'
                        };
                    } else {
                        return {
                            success: false,
                            message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
                        };
                    }
                }
                
                var result = validateUserLogin('" + username.Replace("'", "\\'") + "', '" + password.Replace("'", "\\'") + @"');
                if (result.success) {
                    sessionStorage.setItem('sessionId', result.sessionId);
                    sessionStorage.setItem('username', result.user.username);
                    sessionStorage.setItem('fullName', result.user.fullName);
                    sessionStorage.setItem('role', result.user.role);
                    sessionStorage.setItem('loginTime', new Date().toISOString());
                    
                    showSuccess('تم تسجيل الدخول بنجاح! مرحباً ' + result.user.fullName);
                    setTimeout(function(){ window.location.href = 'index.html'; }, 2000);
                } else {
                    showError(result.message);
                }
                hideLoading();
            ";
        }
    </script>
</body>
</html>