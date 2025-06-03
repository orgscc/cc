// قاعدة البيانات الرئيسية - base.js
// Database Management System

class DatabaseManager {
    constructor() {
        this.users = new Map();
        this.sessions = new Map();
        this.initializeDefaultUsers();
    }

    // تهيئة المستخدمين الافتراضيين
    initializeDefaultUsers() {
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                password: this.hashPassword('123456'),
                email: 'admin@system.com',
                fullName: 'مدير النظام',
                role: 'admin',
                status: 'active',
                createdAt: new Date(),
                lastLogin: null,
                loginAttempts: 0,
                isLocked: false
            },
            {
                id: 2,
                username: 'user1',
                password: this.hashPassword('password'),
                email: 'user1@example.com',
                fullName: 'المستخدم الأول',
                role: 'user',
                status: 'active',
                createdAt: new Date(),
                lastLogin: null,
                loginAttempts: 0,
                isLocked: false
            },
            {
                id: 3,
                username: 'test@example.com',
                password: this.hashPassword('test123'),
                email: 'test@example.com',
                fullName: 'مستخدم تجريبي',
                role: 'user',
                status: 'active',
                createdAt: new Date(),
                lastLogin: null,
                loginAttempts: 0,
                isLocked: false
            },
            {
                id: 4,
                username: 'مستخدم',
                password: this.hashPassword('123456'),
                email: 'arabic@example.com',
                fullName: 'مستخدم عربي',
                role: 'user',
                status: 'active',
                createdAt: new Date(),
                lastLogin: null,
                loginAttempts: 0,
                isLocked: false
            },
            {
                id: 5,
                username: 'guest',
                password: this.hashPassword('guest123'),
                email: 'guest@example.com',
                fullName: 'مستخدم ضيف',
                role: 'guest',
                status: 'active',
                createdAt: new Date(),
                lastLogin: null,
                loginAttempts: 0,
                isLocked: false
            }
        ];

        // إضافة المستخدمين لخريطة قاعدة البيانات
        defaultUsers.forEach(user => {
            this.users.set(user.username.toLowerCase(), user);
            if (user.email && user.email !== user.username) {
                this.users.set(user.email.toLowerCase(), user);
            }
        });
    }

    // تشفير كلمة المرور (محاكاة بسيطة)
    hashPassword(password) {
        // في التطبيق الحقيقي، استخدم مكتبة تشفير قوية مثل bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // تحويل إلى 32bit integer
        }
        return Math.abs(hash).toString(16);
    }

    // التحقق من صحة كلمة المرور
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }

    // البحث عن مستخدم
    findUser(identifier) {
        const key = identifier.toLowerCase().trim();
        return this.users.get(key) || null;
    }

    // التحقق من صحة بيانات تسجيل الدخول
    validateLogin(username, password) {
        try {
            // التحقق من وجود البيانات
            if (!username || !password) {
                return {
                    success: false,
                    message: 'يرجى إدخال اسم المستخدم وكلمة المرور',
                    errorCode: 'MISSING_CREDENTIALS'
                };
            }

            // البحث عن المستخدم
            const user = this.findUser(username);
            if (!user) {
                return {
                    success: false,
                    message: 'اسم المستخدم غير موجود',
                    errorCode: 'USER_NOT_FOUND'
                };
            }

            // التحقق من حالة المستخدم
            if (user.status !== 'active') {
                return {
                    success: false,
                    message: 'الحساب غير مفعل أو محظور',
                    errorCode: 'ACCOUNT_INACTIVE'
                };
            }

            // التحقق من قفل الحساب
            if (user.isLocked) {
                return {
                    success: false,
                    message: 'الحساب مقفل بسبب محاولات تسجيل دخول فاشلة متكررة',
                    errorCode: 'ACCOUNT_LOCKED'
                };
            }

            // التحقق من كلمة المرور
            if (!this.verifyPassword(password, user.password)) {
                // زيادة عدد محاولات تسجيل الدخول الفاشلة
                user.loginAttempts++;

                // قفل الحساب بعد 5 محاولات فاشلة
                if (user.loginAttempts >= 5) {
                    user.isLocked = true;
                    return {
                        success: false,
                        message: 'تم قفل الحساب بسبب محاولات تسجيل دخول فاشلة متكررة',
                        errorCode: 'ACCOUNT_LOCKED_NOW'
                    };
                }

                return {
                    success: false,
                    message: `كلمة المرور غير صحيحة. المحاولات المتبقية: ${5 - user.loginAttempts}`,
                    errorCode: 'INVALID_PASSWORD',
                    remainingAttempts: 5 - user.loginAttempts
                };
            }

            // تسجيل دخول ناجح
            user.loginAttempts = 0; // إعادة تعيين المحاولات
            user.lastLogin = new Date();

            // إنشاء جلسة جديدة
            const sessionId = this.generateSessionId();
            const session = {
                sessionId: sessionId,
                userId: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                loginTime: new Date(),
                expiryTime: new Date(Date.now() + (24 * 60 * 60 * 1000)), // 24 ساعة
                isActive: true
            };

            this.sessions.set(sessionId, session);

            return {
                success: true,
                message: 'تم تسجيل الدخول بنجاح',
                user: {
                    id: user.id,
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                },
                sessionId: sessionId,
                expiryTime: session.expiryTime
            };

        } catch (error) {
            return {
                success: false,
                message: 'حدث خطأ أثناء تسجيل الدخول',
                errorCode: 'SYSTEM_ERROR',
                error: error.message
            };
        }
    }

    // إنشاء معرف جلسة فريد
    generateSessionId() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2);
        return `session_${timestamp}_${random}`;
    }

    // التحقق من صحة الجلسة
    validateSession(sessionId) {
        const session = this.sessions.get(sessionId);

        if (!session) {
            return { valid: false, message: 'الجلسة غير موجودة' };
        }

        if (!session.isActive) {
            return { valid: false, message: 'الجلسة غير مفعلة' };
        }

        if (new Date() > session.expiryTime) {
            session.isActive = false;
            return { valid: false, message: 'انتهت صلاحية الجلسة' };
        }

        return { valid: true, session: session };
    }

    // تسجيل خروج
    logout(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.isActive = false;
            return { success: true, message: 'تم تسجيل الخروج بنجاح' };
        }
        return { success: false, message: 'الجلسة غير موجودة' };
    }

    // إضافة مستخدم جديد
    addUser(userData) {
        try {
            // التحقق من وجود اسم المستخدم
            if (this.findUser(userData.username)) {
                return {
                    success: false,
                    message: 'اسم المستخدم موجود بالفعل',
                    errorCode: 'USERNAME_EXISTS'
                };
            }

            // التحقق من وجود البريد الإلكتروني
            if (userData.email && this.findUser(userData.email)) {
                return {
                    success: false,
                    message: 'البريد الإلكتروني مستخدم بالفعل',
                    errorCode: 'EMAIL_EXISTS'
                };
            }

            // إنشاء مستخدم جديد
            const newUser = {
                id: this.getNextUserId(),
                username: userData.username.toLowerCase().trim(),
                password: this.hashPassword(userData.password),
                email: userData.email ? userData.email.toLowerCase().trim() : null,
                fullName: userData.fullName || userData.username,
                role: userData.role || 'user',
                status: 'active',
                createdAt: new Date(),
                lastLogin: null,
                loginAttempts: 0,
                isLocked: false
            };

            // إضافة المستخدم
            this.users.set(newUser.username, newUser);
            if (newUser.email) {
                this.users.set(newUser.email, newUser);
            }

            return {
                success: true,
                message: 'تم إنشاء الحساب بنجاح',
                userId: newUser.id
            };

        } catch (error) {
            return {
                success: false,
                message: 'حدث خطأ أثناء إنشاء الحساب',
                errorCode: 'SYSTEM_ERROR',
                error: error.message
            };
        }
    }

    // الحصول على معرف المستخدم التالي
    getNextUserId() {
        let maxId = 0;
        for (let user of this.users.values()) {
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        return maxId + 1;
    }

    // إلغاء قفل حساب المستخدم
    unlockUser(username) {
        const user = this.findUser(username);
        if (user) {
            user.isLocked = false;
            user.loginAttempts = 0;
            return { success: true, message: 'تم إلغاء قفل الحساب' };
        }
        return { success: false, message: 'المستخدم غير موجود' };
    }

    // تغيير كلمة المرور
    changePassword(username, oldPassword, newPassword) {
        const user = this.findUser(username);
        if (!user) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        if (!this.verifyPassword(oldPassword, user.password)) {
            return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };
        }

        user.password = this.hashPassword(newPassword);
        return { success: true, message: 'تم تغيير كلمة المرور بنجاح' };
    }

    // الحصول على إحصائيات النظام
    getSystemStats() {
        const totalUsers = new Set();
        for (let user of this.users.values()) {
            totalUsers.add(user.id);
        }

        const activeSessions = Array.from(this.sessions.values())
            .filter(session => session.isActive && new Date() <= session.expiryTime).length;

        return {
            totalUsers: totalUsers.size,
            activeSessions: activeSessions,
            totalSessions: this.sessions.size
        };
    }

    // تصدير البيانات (للنسخ الاحتياطي)
    exportData() {
        const users = Array.from(this.users.values())
            .filter((user, index, self) =>
                index === self.findIndex(u => u.id === user.id)
            );

        return {
            users: users,
            exportDate: new Date(),
            version: '1.0'
        };
    }
}

// إنشاء مثيل واحد من قاعدة البيانات
const database = new DatabaseManager();

// تصدير الوظائف للاستخدام في ASPX
if (typeof module !== 'undefined' && module.exports) {
    module.exports = database;
} else if (typeof window !== 'undefined') {
    window.Database = database;
}

// وظائف مساعدة للاستخدام المباشر
function validateUserLogin(username, password) {
    return database.validateLogin(username, password);
}

function createUserSession(username, password) {
    return database.validateLogin(username, password);
}

function checkUserSession(sessionId) {
    return database.validateSession(sessionId);
}

function logoutUser(sessionId) {
    return database.logout(sessionId);
}

function registerNewUser(userData) {
    return database.addUser(userData);
}

// إتاحة الوظائف عالمياً
if (typeof window !== 'undefined') {
    window.validateUserLogin = validateUserLogin;
    window.createUserSession = createUserSession;
    window.checkUserSession = checkUserSession;
    window.logoutUser = logoutUser;
    window.registerNewUser = registerNewUser;
}