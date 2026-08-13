// src/config/brevo.js
const sdk = require('sib-api-v3-sdk');

const apiInstance = new sdk.TransactionalEmailsApi();
apiInstance.apiClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

// Email configuration
const emailConfig = {
  sender: {
    email: process.env.BREVO_SENDER_EMAIL,
    name: process.env.BREVO_SENDER_NAME,
  },
};

module.exports = { apiInstance, emailConfig };