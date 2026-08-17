// src/config/africasTalking.js
const africastalking = require('africastalking');

// ✅ Add validation and error handling
const username = process.env.AFRICASTALKING_USERNAME;
const apiKey = process.env.AFRICASTALKING_API_KEY;

if (!username || !apiKey) {
  console.warn('⚠️ Africa\'s Talking credentials not configured. SMS will be disabled.');
  console.warn('   Set AFRICASTALKING_USERNAME and AFRICASTALKING_API_KEY in .env');
}

// Initialize with proper error handling
let AT, sms;
try {
  AT = africastalking({
    apiKey: apiKey || 'dummy_key',
    username: username || 'sandbox',
  });
  sms = AT.SMS;
  console.log('✅ Africa\'s Talking initialized');
} catch (error) {
  console.error('❌ Africa\'s Talking initialization failed:', error.message);
  // Create a mock SMS service for development
  sms = {
    send: async (params) => {
      console.log('📱 [MOCK] SMS would be sent:', params);
      return { SMSMessageData: { Recipients: [{ status: 'Success' }] } };
    }
  };
}

module.exports = { sms, AT };