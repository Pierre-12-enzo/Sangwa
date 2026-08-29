// backend/config/africasTalking.js
const africastalking = require('africastalking');

// Get credentials from environment
const username = process.env.AFRICASTALKING_USERNAME;
const apiKey = process.env.AFRICASTALKING_API_KEY;

// Check if credentials exist
const hasCredentials = username && apiKey &&
  username !== 'undefined' &&
  apiKey !== 'undefined' &&
  username !== '' &&
  apiKey !== '';

let sms;

if (hasCredentials) {
  try {
    console.log('🔐 Initializing Africa\'s Talking...');
    console.log(`📱 Username: ${username}`);
    console.log(`🔑 API Key: ${apiKey.substring(0, 8)}...`);

    const AT = africastalking({
      apiKey: apiKey,
      username: username,
    });
    sms = AT.SMS;
    console.log('✅ Africa\'s Talking initialized successfully');
  } catch (error) {
    console.error('❌ Africa\'s Talking initialization failed:', error.message);
    sms = createMockSMS();
  }
} else {
  console.log('ℹ️ Africa\'s Talking credentials not configured.');
  console.log('   Set AFRICASTALKING_USERNAME and AFRICASTALKING_API_KEY in .env');
  console.log('   SMS will use mock mode.');
  sms = createMockSMS();
}

function createMockSMS() {
  console.log('📱 [MOCK MODE] SMS will be logged to console');
  return {
    send: async (params) => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📱 [MOCK] SMS would be sent:');
      console.log(`   To: ${params.to}`);
      console.log(`   Message: ${params.message}`);
      console.log(`   From: ${params.from || 'SANGWA'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return {
        SMSMessageData: {
          Recipients: [{
            status: 'Success',
            messageId: 'mock_' + Date.now(),
            cost: '0.00',
            count: 1
          }]
        }
      };
    }
  };
}

module.exports = { sms };