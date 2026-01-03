// db.js

const { PrismaClient } = require('@prisma/client');

// ✅ الاعتماد الكلي على متغير البيئة DATABASE_URL لضمان الأمان
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL is not defined in environment variables.");
}

// ✅ تهيئة PrismaClient مع تحديد الـ datasource
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

// ✅ تصدير prisma لباقي الملفات
module.exports = prisma;
