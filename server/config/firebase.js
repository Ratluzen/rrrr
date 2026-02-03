const admin = require('firebase-admin');

// ✅ ملاحظة: يجب وضع ملف firebase-service-account.json في مجلد server/config/
// أو استخدام متغيرات البيئة لإعداد Firebase Admin بشكل آمن.
try {
  const serviceAccount = require('./firebase-service-account.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firebase Admin Initialized');
} catch (error) {
  console.error('⚠️ Firebase Admin failed to initialize. Make sure firebase-service-account.json exists.');
}

module.exports = admin;
