import express from 'express';
import Call from '../models/Call.js';
import Eoc from '../models/Eoc.js';

const router = express.Router();

/**
 * POST /api/webhooks/ghl-call
 * Receives webhook data from EOC API
 * This webhook is received when aN EOC is created.
 */

router.post('/eoc-created', async (req, res) => {
  try {
    console.log('📞 Received webhook from EOC:', JSON.stringify(req.body, null, 2));
    
    // Extract and map data from EOC webhook
    // Note: Adjust these field names based on actual EOC webhook structure
    const eocData = {
      // Store complete webhook for debugging
      
      dateOfCall: req.body.dateOfCall,
      calendar: req.body.calendar,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      notes: req.body.notes,
      closer: req.body.closer,
      callOutcome: req.body.callOutcome,
      objections: req.body.objections,
      callRecording: req.body.callRecording,
      rawWebhookData: req.body
    };
    
    // Check if call already exists (prevent duplicates)
    const existingCall = await Eoc.findOne({ 
      dateOfCall: eocData.dateOfCall, 
      calendar: eocData.calendar, 
      fullName: eocData.fullName, 
      phoneNumber: eocData.phoneNumber, 
      emailAddress: eocData.emailAddress, 
      callOutcome: eocData.callOutcome });
    if (existingCall) {
      console.log('⚠️  Call already exists, updating instead');
      await Eoc.findOneAndUpdate({ dateOfCall: eocData.dateOfCall, calendar: eocData.calendar, fullName: eocData.fullName, phoneNumber: eocData.phoneNumber, emailAddress: eocData.emailAddress, callOutcome: eocData.callOutcome }, eocData);
    } else {
      // Save new call to MongoDB
      const newCall = new Eoc(eocData);
      await newCall.save();
      console.log('✅ Call saved to database');
    }
    
    // Always send 200 response to GHL
    res.status(200).json({ 
      success: true, 
      message: 'Webhook received and processed',
      dateOfCall: eocData.dateOfCall
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

//

/**
 * GET /api/webhooks/calls
 * Fetches all calls for the React dashboard
 */
router.get('/api/webhooks/calls', async (req, res) => {
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
router.get('/api/webhooks/stats', async (req, res) => {
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
router.delete('/api/webhooks/calls/:id', async (req, res) => {
  try {
    await Call.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Call deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;



