// backend/config/brevo.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Get API key from environment
const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL;
const senderName = process.env.BREVO_SENDER_NAME || 'Sangwa Polyclinic';

// Debug info
console.log('🔍 Brevo Configuration:');
console.log(`   API Key: ${apiKey ? '✅ Present' : '❌ Missing'}`);
console.log(`   Sender Email: ${senderEmail || '❌ Missing'}`);
console.log(`   Sender Name: ${senderName}`);

// Check if API key has valid format
const hasValidKey = apiKey && apiKey.startsWith('xkeysib-') && apiKey.length > 20;

// Check if sender email is provided
const hasValidSender = senderEmail && senderEmail.includes('@');

let apiInstance;
const emailConfig = {
  sender: {
    email: senderEmail || 'noreply@sangwapolyclinic.com',
    name: senderName,
  },
};

if (hasValidKey && hasValidSender) {
  try {
    // Initialize Brevo client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;

    apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    console.log('✅ Brevo initialized successfully');
    console.log(`📧 Sender: ${senderName} <${senderEmail}>`);
  } catch (error) {
    console.error('❌ Brevo initialization failed:', error.message);
    apiInstance = createMockBrevo();
  }
} else {
  console.log('⚠️ Brevo configuration incomplete:');
  if (!hasValidKey) console.log('   - Invalid or missing BREVO_API_KEY');
  if (!hasValidSender) console.log('   - Invalid or missing BREVO_SENDER_EMAIL');
  console.log('   Email will use mock mode.');
  apiInstance = createMockBrevo();
}

function createMockBrevo() {
  console.log('📧 [MOCK MODE] Emails will be logged to console');
  return {
    sendTransacEmail: async (params) => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 [MOCK] Email would be sent:');
      console.log(`   To: ${params.to?.[0]?.email || 'unknown'}`);
      console.log(`   Subject: ${params.subject || 'No subject'}`);
      console.log(`   Sender: ${params.sender?.email || 'unknown'}`);
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