import express from 'express';
import Call from '../models/Call.js';
import Eoc from '../models/Eoc.js';
import BookedCall from '../models/BookedCall.js';

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
    const customData = req.body.customData || {};

    const eocData = {
      // Store complete webhook for debugging
      
      dateOfCall: customData.dateOfCall,
      calendar: customData.calendar,
      fullName: customData.fullName,
      phoneNumber: customData.phoneNumber,
      emailAddress: customData.emailAddress,
      notes: customData.notes,
      closer: customData.closer,
      callOutcome: customData.callOutcome,
      objections: customData.objections,
      callRecording: customData.callRecording,
    };

    // Check if call already exists (prevent duplicates)
    const existingCall = await Eoc.findOne({
      dateOfCall: eocData.dateOfCall,
      calendar: eocData.calendar,
      fullName: eocData.fullName,
      phoneNumber: eocData.phoneNumber,
      emailAddress: eocData.emailAddress,
      callOutcome: eocData.callOutcome
    });
    if (existingCall) {
      console.log('⚠️  Call already exists, updating instead');
      await Eoc.findOneAndUpdate({ 
        dateOfCall: eocData.dateOfCall, 
        calendar: eocData.calendar, 
        fullName: eocData.fullName, 
        phoneNumber: eocData.phoneNumber, 
        emailAddress: eocData.emailAddress, 
        callOutcome: eocData.callOutcome }, 
        eocData);
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

/**
 * POST /booked-call-created
 * Receives webhook data when a call is booked
 */
router.post('/booked-call-created', async (req, res) => {
  try {
    console.log('📅 Received Booked Call webhook:', JSON.stringify(req.body, null, 2));

    // Extract and map data from webhook (simplified structure)
    const {
      'Full Name': fullName,
      'Email': email,
      'Phone': phone,
      'Contact Source': contactSource,
      user,
      calendar
    } = req.body;

    const bookedCallData = {
      // Contact information
      fullName,
      email,
      phone,
      contactSource,
      
      // User data (who's handling the appointment)
      user: user ? {
        userFirstName: user['User First Name'],
        userLastName: user['User Last Name'],
        userEmail: user['User Email']
      } : undefined,
      
      // Calendar/Appointment data
      calendar: calendar ? {
        calendarTitle: calendar['Calendar Title'],
        calendarSelectedTimezone: calendar['Calendar Selected Timezone'],
        calendarStartTime: calendar['Calendar Start Time'],
        calendarEndTime: calendar['Calendar End Time'],
        calendarStatus: calendar['Calendar Status'],
        calendarAppointmentStatus: calendar['Calendar Appoinment Status'],
        calendarAddress: calendar['Calendar Address'],
        calendarDateCreated: calendar['Calendar Date Created'],
        calendarCreatedBy: calendar['Calendar Created By'],
        calendarCreatedByUserId: calendar['Calendar Created By User Id'],
        calendarId: calendar['Calendar ID'],
        calendarCalendarName: calendar['Calendar Calendar Name']
      } : undefined
    };

    // Check if booked call already exists (prevent duplicates)
    // Use combination of email and calendar start time for duplicate detection
    const existingCall = await BookedCall.findOne({
      email: bookedCallData.email,
      'calendar.calendarStartTime': bookedCallData.calendar?.calendarStartTime
    });

    if (existingCall) {
      console.log('⚠️  Booked call already exists, updating instead');
      await BookedCall.findOneAndUpdate(
        { 
          email: bookedCallData.email,
          'calendar.calendarStartTime': bookedCallData.calendar?.calendarStartTime
        },
        bookedCallData
      );
    } else {
      // Save new booked call to MongoDB
      const newBookedCall = new BookedCall(bookedCallData);
      await newBookedCall.save();
      console.log('✅ Booked call saved to database');
    }

    // Always send 200 response
    res.status(200).json({
      success: true,
      message: 'Booked call webhook received and processed',
      calendarId: bookedCallData.calendar?.calendarId,
      appointmentTime: bookedCallData.calendar?.calendarStartTime
    });

  } catch (error) {
    console.error('❌ Error processing booked call webhook:', error);
    // Still send 200 to prevent retrying
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
 * GET /api/webhooks/eocs
 * Fetches recent EOCs for the React dashboard
 */
router.get('/eocs', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const eocs = await Eoc.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json(eocs);
  } catch (error) {
    console.error('❌ Error fetching EOCs:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /booked-calls
 * Fetches recent booked calls for the React dashboard
 */
router.get('/booked-calls', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const bookedCalls = await BookedCall.find()
      .sort({ 'calendar.calendarStartTime': -1 })
      .limit(parseInt(limit));

    res.json(bookedCalls);
  } catch (error) {
    console.error('❌ Error fetching booked calls:', error);
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
router.delete('/api/webhooks/calls/:id', async (req, res) => {
  try {
    await Call.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Call deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;



