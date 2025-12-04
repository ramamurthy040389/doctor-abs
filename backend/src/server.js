// src/server.js
require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');
const logger = require('./config/logger') || console;

(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info ? logger.info(`Server started on port ${PORT}`) : console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
