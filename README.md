# Ratelozn Services | خدمات راتلوزن 📱🚀
![Version](https://img.shields.io/badge/version-3.4.0-yellow.svg)
![Stack](https://img.shields.io/badge/Full%20Stack-MERN%2FPERN-blue)
![Platform](https://img.shields.io/badge/Platform-Android%20|%20Web-green)
منصة متكاملة لبيع البطاقات الرقمية وخدمات الشحن، تتكون من تطبيق موبايل احترافي (Frontend) وسيرفر قوي (Backend) لإدارة العمليات.
---
## 🔥 أبرز المميزات الجديدة (v3.4)
### 1. التطبيق (Frontend & Mobile)
*   **نظام الفواتير:** توليد فواتير صورية احترافية مع إمكانية الحفظ والمشاركة.
*   **الحماية:** نظام كشف النواسخ (Anti-Cloning) لحماية التطبيق المزدوج.
*   **واجهة المستخدم:** تصميم جديد كلياً للبطاقات، القوائم، ونافذة الشراء.
*   **أداء:** منع الارتداد (Anti-Overscroll) وثبات الواجهة.
### 2. لوحة الإدارة (Admin Dashboard)
*   **نظام المخزون (Inventory):** إضافة الأكواد وتخصيصها حسب المنتج والدولة.
*   **التسليم التلقائي (Auto-Delivery):** تسليم الكود فوراً للمستخدم عند توفره في المخزون.
*   **التحليلات (Analytics):** رسوم بيانية للمبيعات وحساب الأرباح بدقة.
*   **إدارة المحتوى:** تعديل البانرات، الإشعارات، والفئات ديناميكياً.
### 3. السيرفر (Backend API)
*   **التقنية:** Node.js + Express + Prisma ORM.
*   **قاعدة البيانات:** مجهز لـ PostgreSQL (Neon/Heroku).
*   **الأمان:** حماية ضد الهجمات (Rate Limiting, Helmet, Input Validation).
*   **الهيكلية:** MVC Pattern احترافي قابل للتوسع.
---
## 🛠 التقنيات المستخدمة (Tech Stack)
### الواجهة الأمامية (Frontend)
*   **Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS
*   **Mobile Engine:** Capacitor 6 (Android)
*   **Utils:** Lucide React, html2canvas
### الواجهة الخلفية (Backend)
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database ORM:** Prisma
*   **Database:** PostgreSQL
*   **Security:** Helmet, Express-Validator, BCrypt, JWT
---
## 🚀 دليل التشغيل (Setup Guide)
### أولاً: تشغيل تطبيق الواجهة (Frontend)
1.  تثبيت الحزم:
    ```bash
    npm install
    ```
2.  تشغيل وضع المطور:
    ```bash
    npm run dev
    ```
3.  بناء تطبيق الأندرويد (APK):
    ```bash
    npm run android:build
    npm run android:open
    ```
### ثانياً: إعداد وتشغيل السيرفر (Backend)
المجلد `server/` يحتوي على الباك إند المستقل.
1.  الدخول لمجلد السيرفر:
    ```bash
    cd server
    ```
2.  تثبيت حزم السيرفر:
    ```bash
    npm install
    ```
3.  إعداد قاعدة البيانات:
    *   قم بإنشاء ملف `.env` داخل مجلد `server` (استخدم `.env.example` كمرجع).
    *   ضع رابط قاعدة بيانات PostgreSQL في `DATABASE_URL`.
4.  توليد جداول قاعدة البيانات:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
5.  تشغيل السيرفر:
    ```bash
    npm run dev
    ```
---
## 📂 هيكلية المشروع
*   `src/`: كود الواجهة الأمامية (React).
    *   `pages/`: صفحات التطبيق (Home, Admin, Wallet...).
    *   `components/`: المكونات المعاد استخدامها (Modal, Card...).
*   `server/`: كود الواجهة الخلفية (Node.js).
    *   `controllers/`: المنطق البرمجي.
    *   `prisma/`: مخطط قاعدة البيانات.
    *   `routes/`: روابط API.
*   `android/`: ملفات مشروع الأندرويد Native.
---
تم التطوير بواسطة **خدمات راتلوزن** © 2025
