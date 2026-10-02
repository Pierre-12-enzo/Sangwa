// backend/controllers/serviceController.js
const Service = require('../models/Service');
const asyncHandler = require('../utils/asyncHandler');
const { log } = require('../middleware/auditLogger');

exports.listPublic = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true })
    .populate('doctors', 'fullName title photo')
    .sort({ category: 1, name: 1 });
  res.json({ success: true, count: services.length, data: services });
});

exports.getBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true })
    .populate('doctors', 'fullName title photo bio weeklySchedule')
    .populate('acceptedInsurances', 'name shortName logo');
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

exports.create = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  await log({ user: req.user, action: 'service.create', resourceType: 'Service', resourceId: service._id, req });
  res.status(201).json({ success: true, data: service });
});

exports.update = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  await log({ user: req.user, action: 'service.update', resourceType: 'Service', resourceId: service._id, req });
  res.json({ success: true, data: service });
});

exports.remove = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  await log({ user: req.user, action: 'service.delete', resourceType: 'Service', resourceId: service._id, req });
  res.json({ success: true, message: 'Service deactivated' });
});