// backend/controllers/insuranceController.js
const Insurance = require('../models/Insurance');
const asyncHandler = require('../utils/asyncHandler');
const { log } = require('../middleware/auditLogger');

exports.listPublic = asyncHandler(async (req, res) => {
  const insurances = await Insurance.find({ isActive: true, displayOnWebsite: true })
    .select('name shortName logo description coveragePercentage')
    .sort({ name: 1 });
  res.json({ success: true, count: insurances.length, data: insurances });
});

exports.listAll = asyncHandler(async (req, res) => {
  const insurances = await Insurance.find().sort({ name: 1 });
  res.json({ success: true, count: insurances.length, data: insurances });
});

exports.create = asyncHandler(async (req, res) => {
  const insurance = await Insurance.create(req.body);
  await log({ user: req.user, action: 'service.create', resourceType: 'Insurance', resourceId: insurance._id, req });
  res.status(201).json({ success: true, data: insurance });
});

exports.update = asyncHandler(async (req, res) => {
  const insurance = await Insurance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!insurance) return res.status(404).json({ success: false, message: 'Insurance not found' });
  res.json({ success: true, data: insurance });
});