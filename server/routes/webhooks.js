import express from 'express';
import Call from '../models/Call.js';

const router = express.Router();

/**
 * POST /api/webhooks/ghl-call
 * Receives webhook data from GoHighLevel
 */
router.post('/ghl-call', async (req, res) => {
  try {
    console.log('📞 Received webhook from GHL:', JSON.stringify(req.body, null, 2));
    
    // Extract and map data from GHL webhook
    // Note: Adjust these field names based on actual GHL webhook structure
    const callData = {
      callId: req.body.id || req.body.call_id || `call_${Date.now()}`,
      salesRep: req.body.user_name || req.body.agent_name || 'Unknown',
      salesRepId: req.body.user_id || req.body.agent_id,
      customerName: req.body.contact_name || req.body.customer_name,
      customerPhone: req.body.contact_phone || req.body.phone,
      outcome: req.body.call_status || req.body.outcome || 'completed',
      revenue: parseFloat(req.body.deal_value || req.body.revenue || 0),
      callDate: req.body.call_date ? new Date(req.body.call_date) : new Date(),
      duration: parseInt(req.body.duration || req.body.call_duration || 0),
      notes: req.body.notes || req.body.description,
      tags: req.body.tags || [],
      rawWebhookData: req.body // Store complete webhook for debugging
    };
    
    // Check if call already exists (prevent duplicates)
    const existingCall = await Call.findOne({ callId: callData.callId });
    if (existingCall) {
      console.log('⚠️  Call already exists, updating instead');
      await Call.findOneAndUpdate({ callId: callData.callId }, callData);
    } else {
      // Save new call to MongoDB
      const newCall = new Call(callData);
      await newCall.save();
      console.log('✅ Call saved to database');
    }
    
    // Always send 200 response to GHL
    res.status(200).json({ 
      success: true, 
      message: 'Webhook received and processed',
      callId: callData.callId
    });
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    // Still send 200 to prevent GHL from retrying
    res.status(200).json({ 
      success: false, 
      message: 'Webhook received but error occurred',
      error: error.message 
    });
  }
});

/**
 * GET /api/webhooks/calls
 * Fetches all calls for the React dashboard
 */
router.get('/calls', async (req, res) => {
  try {
    const { 
      startDate, 
      endDate, 
      salesRep, 
      outcome,
      limit = 1000 
    } = req.query;
    
    // Build query
    let query = {};
    
    if (startDate || endDate) {
      query.callDate = {};
      if (startDate) query.callDate.$gte = new Date(startDate);
      if (endDate) query.callDate.$lte = new Date(endDate);
    }
    
    if (salesRep) {
      query.salesRep = salesRep;
    }
    
    if (outcome) {
      query.outcome = outcome;
    }
    
    const calls = await Call.find(query)
      .sort({ callDate: -1 })
      .limit(parseInt(limit));
    
    res.json(calls);
  } catch (error) {
    console.error('❌ Error fetching calls:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/webhooks/stats
 * Get dashboard statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const totalCalls = await Call.countDocuments();
    const completedCalls = await Call.countDocuments({ outcome: 'completed' });
    const totalRevenue = await Call.aggregate([
      { $group: { _id: null, total: { $sum: '$revenue' } } }
    ]);
    
    res.json({
      totalCalls,
      completedCalls,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE /api/webhooks/calls/:id
 * Delete a specific call (for testing)
 */
router.delete('/calls/:id', async (req, res) => {
  try {
    await Call.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Call deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;



