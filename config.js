const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  owner: { name: process.env.OWNER_NAME || 'JoyBoySer', number: process.env.OWNER_NUMBER || '+918714504817' },
  sessionId: process.env.SESSION_ID || 'delta-session',
  prefix: process.env.PREFIX || '.',
  mongoUri: process.env.MONGODB_URI || '',
  logLevel: process.env.LOG_LEVEL || 'info'
};
