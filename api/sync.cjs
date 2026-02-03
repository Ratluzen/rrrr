const { syncOnce } = require('../server/services/kd1sSync');

module.exports = async (req, res) => {
  // التحقق من وجود مفتاح API لـ KD1S
  if (!process.env.KD1S_API_KEY) {
    return res.status(500).json({ error: 'KD1S_API_KEY is not configured' });
  }

  try {
    console.log('Starting KD1S status sync via Cron...');
    await syncOnce();
    console.log('KD1S status sync completed successfully.');
    res.status(200).json({ status: 'success', message: 'Sync completed' });
  } catch (error) {
    console.error('KD1S sync error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
