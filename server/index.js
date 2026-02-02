const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config();

// تأكد من أن هذا المسار صحيح
const prisma = require('./config/db'); 
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { startKd1sStatusSync } = require('./services/kd1sSync');

const app = express();

// مهم لبيئات الاستضافة
app.set('trust proxy', 1);

// الأمن والأداء
app.use(helmet({
  contentSecurityPolicy: false, // تعطيله لتجنب مشاكل مع الواجهة الأمامية إذا كانت في نفس النطاق
}));
app.use(compression());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
// ✅ PayTabs (and some gateways) may POST application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// ---------------------------------------------
// ✅ Health Check Route
// ---------------------------------------------
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// ---------------------------------------------
// Routes
// ---------------------------------------------
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// New Features Routes
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// ---------------------------------------------
// ✅ Root Route (لـ Health Check الافتراضي على '/')
// ---------------------------------------------
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Ratnzer Backend is running',
  });
});

// Errors
app.use(notFound);
app.use(errorHandler);

// ---------------------------------------------
// Server Startup Function
// ---------------------------------------------
async function startServer() {
  const PORT = process.env.PORT || 5000; 
  const HOST = '0.0.0.0';

  try {
    await prisma.$connect();
    console.log('✅ Connected to database (Neon / PostgreSQL)');
    
    // تشغيل السيرفر فقط إذا لم يتم استيراده كـ module (أي ليس في بيئة Vercel)
    if (require.main === module) {
      app.listen(PORT, HOST, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on ${HOST}:${PORT}`);
        console.log('Ratnzer Backend (Prisma/Postgres) is Ready! 🚀');
      });
      
      // بدء مزامنة الطلبات فقط في البيئة المستمرة
      startKd1sStatusSync();
    }

  } catch (error) {
    console.error('❌ FATAL ERROR: Database connection failed.');
    console.error(error.message);
    if (require.main === module) {
      process.exit(1); 
    }
  }
}

// بدء المحاولة فقط إذا كان الملف يتم تشغيله مباشرة
if (require.main === module) {
  startServer();
}

// تصدير التطبيق لـ Vercel
module.exports = app;
