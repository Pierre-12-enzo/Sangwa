// src/config/brevo.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

const apiKey = process.env.BREVO_API_KEY;
const hasCredentials = apiKey && apiKey !== 'undefined' && apiKey !== '';

let apiInstance;
const emailConfig = {
  sender: {
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@sangwapolyclinic.com',
    name: process.env.BREVO_SENDER_NAME || 'Sangwa Polyclinic',
  },
};

if (hasCredentials) {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;
    apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    console.log('✅ Brevo initialized');
  } catch (error) {
    console.error('❌ Brevo initialization failed:', error.message);
    apiInstance = createMockBrevo();
  }
} else {
  console.log('ℹ️ Brevo API key not configured.');
  console.log('   Set BREVO_API_KEY in .env');
  console.log('   Email will use mock mode.');
  apiInstance = createMockBrevo();
}

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