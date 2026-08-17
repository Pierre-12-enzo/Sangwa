// src/config/brevo.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Check if API key exists
const apiKey = process.env.BREVO_API_KEY;
const hasCredentials = apiKey && apiKey !== 'undefined';

let apiInstance;
const emailConfig = {
  sender: {
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@sangwapolyclinic.com',
    name: process.env.BREVO_SENDER_NAME || 'Sangwa Polyclinic',
  },
};

if (hasCredentials) {
  try {
    // Create default client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    // Configure API key authorization
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;

    // Create API instance
    apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    console.log('✅ Brevo initialized');
  } catch (error) {
    console.error('❌ Brevo initialization failed:', error.message);
    apiInstance = createMockBrevo();
  }
} else {
  console.warn('⚠️ Brevo API key not configured.');
  console.warn('   Set BREVO_API_KEY in .env');
  console.warn('   Email features will be disabled.');
  apiInstance = createMockBrevo();
}

// Mock Brevo service for development
function createMockBrevo() {
  return {
    sendTransacEmail: async (params) => {
      console.log('📧 [MOCK] Email would be sent:');
      console.log(`   To: ${params.to?.[0]?.email}`);
      console.log(`   Subject: ${params.subject}`);
      console.log(`   Sender: ${params.sender?.email}`);
      return { messageId: 'mock_' + Date.now() };
    }
  };
}

module.exports = { apiInstance, emailConfig };