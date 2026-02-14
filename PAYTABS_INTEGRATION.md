# توثيق تكامل PayTabs/Amwal - Ratnzer

تم تحديث نظام الدفع لدعم صفحة الدفع المستضافة (Hosted Payment Page) مع تخصيص روابط العودة والروابط العميقة للتطبيق.

## التغييرات الرئيسية

### 1. Transaction API (Backend)
تم تعديل `server/controllers/paymentController.js` ليدعم:
- **روابط العودة الديناميكية**: يتم إرسال `return_url` بناءً على نوع العملية:
  - شحن المحفظة: `https://www.ratnzer.com/payment/return/wallet`
  - شراء خدمة: `https://www.ratnzer.com/payment/return/service`
- **الحقول المخصصة (Custom Fields)**: يتم إرسال حقل `udf1` لتحديد نوع العملية (`wallet` أو `service`) لضمان معالجتها بشكل صحيح عند العودة.
- **دعم الروابط العميقة (Deep Links)**: عند عودة المستخدم من صفحة الدفع، يقوم الخادم بتوليد رابط عميق لإعادة فتح التطبيق مباشرة:
  - شحن المحفظة: `ratnzer://wallet`
  - شراء خدمة: `ratnzer://service`

### 2. مسارات الخادم (Server Routes)
تمت إضافة مسارات جديدة في `server/index.cjs` للتعامل مع روابط العودة المخصصة:
- `ALL /payment/return/wallet`
- `ALL /payment/return/service`
هذه المسارات توجه الطلب إلى معالج العودة الموحد الذي يتحقق من حالة الدفع ويوجه المستخدم.

### 3. تطبيق الأندرويد (Android App)
تم تحديث `android/app/src/main/AndroidManifest.xml` لدعم الروابط العميقة الجديدة:
- المخطط (Scheme): `ratnzer`
- المضيف (Host): `wallet` و `service`

## كيفية الاختبار

### في بيئة Sandbox
1. تأكد من ضبط المتغيرات البيئية التالية في ملف `.env`:
   - `PAYTABS_REGION`: المنطقة الخاصة بحسابك (مثلاً `ARE` أو `SAU`).
   - `PAYTABS_SERVER_KEY`: مفتاح الخادم الخاص بـ Sandbox.
   - `PAYTABS_PROFILE_ID`: رقم الملف الشخصي الخاص بـ Sandbox.
   - `APP_BASE_URL`: رابط الموقع (مثلاً `https://www.ratnzer.com`).
2. قم بإجراء عملية دفع تجريبية من التطبيق أو الموقع.
3. بعد إتمام الدفع، يجب أن يتم توجيهك إلى رابط العودة المناسب، ومن ثم فتح التطبيق تلقائياً عبر الروابط العميقة.

### الانتقال للحساب الحقيقي (Live)
عند الانتقال للحساب الحقيقي، قم فقط بتحديث المتغيرات البيئية (`SERVER_KEY` و `PROFILE_ID`) إلى القيم الخاصة بالحساب الحقيقي، وسيعمل النظام بنفس الآلية.

---
تم التنفيذ بواسطة Manus AI.
