// src/config/africasTalking.js
const africastalking = require('africastalking');

const AT = africastalking({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_USERNAME,
});

// Initialize SMS service
const sms = AT.SMS;

module.exports = { sms, AT };