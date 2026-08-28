// backend/config/brevo.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

// ✅ Get API key from environment
const apiKey = process.env.BREVO_API_KEY;

// ✅ Debug: Check if API key is configured
console.log('🔍 Brevo API Key Status:', apiKey ? '✅ Present' : '❌ Missing');

// ✅ Check if API key has valid format (starts with xkeysib-)
const hasValidFormat = apiKey && apiKey.startsWith('xkeysib-');
console.log('🔍 Brevo API Key Format:', hasValidFormat ? '✅ Valid format' : '❌ Invalid format');

const hasCredentials = apiKey && 
  apiKey !== 'undefined' && 
  apiKey !== '' &&
  apiKey !== 'null' &&
  apiKey.length > 10;

let apiInstance;
const emailConfig = {
  sender: {
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@sangwapolyclinic.com',
    name: process.env.BREVO_SENDER_NAME || 'Sangwa Polyclinic',
  },
};

if (hasCredentials && hasValidFormat) {
  try {
    // ✅ CORRECT: Initialize Brevo client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    // ✅ IMPORTANT: Use the correct authentication method
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;
    
    // ✅ Create API instance
    apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    console.log('✅ Brevo initialized successfully');
    console.log(`📧 Sender Email: ${emailConfig.sender.email}`);
    console.log(`🔑 API Key: ${apiKey.substring(0, 10)}...`);
  } catch (error) {
    console.error('❌ Brevo initialization failed:', error.message);
    apiInstance = createMockBrevo();
  }
} else {
  console.log('⚠️ Brevo API key not configured or invalid.');
  console.log('   Get your API key from: https://app.brevo.com/settings/keys');
  console.log('   Set BREVO_API_KEY in .env');
  console.log('   Email will use mock mode.');
  apiInstance = createMockBrevo();
}

function createMockBrevo() {
  console.log('📧 [MOCK MODE] Email will be logged to console');
  return {
    sendTransacEmail: async (params) => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 [MOCK] Email would be sent:');
      console.log(`   To: ${params.to?.[0]?.email || 'unknown'}`);
      console.log(`   Subject: ${params.subject || 'No subject'}`);
      console.log(`   Sender: ${params.sender?.email || 'noreply@sangwapolyclinic.com'}`);
      console.log(`   HTML Content Length: ${params.htmlContent?.length || 0} chars`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return { 
        messageId: 'mock_' + Date.now(),
        message: 'Mock email sent successfully'
      };
    }
  };
}

module.exports = { apiInstance, emailConfig };