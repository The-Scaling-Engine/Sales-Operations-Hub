import mongoose from 'mongoose';

const bookedCallSchema = new mongoose.Schema({
    // Contact Information
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    contactSource: {
        type: String,
        required: false
    },  
    // User Information (who created/managed)
    user: {
        userFirstName: String,
        userLastName: String,
        userEmail: String
    },
    
    // Calendar/Appointment Information (Most Important!)
    calendar: {
        calendarTitle: String,
        calendarSelectedTimezone: String,
        calendarStartTime: String,
        calendarEndTime: String,
        calendarStatus: String,
        calendarAppointmentStatus: String,
        calendarAddress: String,
        calendarDateCreated: String,
        calendarCreatedBy: String,
        calendarCreatedByUserId: String,
        calendarId: String,
        calendarCalendarName: String
    },
}, {
    timestamps: true
});

/**
 * Add indexes for better query performance
 */
bookedCallSchema.index({ dateCreated: -1 });
bookedCallSchema.index({ fullName: 1 });
bookedCallSchema.index({ email: 1 });
bookedCallSchema.index({ phone: 1 });
bookedCallSchema.index({ 'calendar.calendarStartTime': -1 });
bookedCallSchema.index({ 'calendar.calendarStatus': 1 });
bookedCallSchema.index({ 'calendar.calendarAppointmentId': 1 });
bookedCallSchema.index({ 'user.userEmail': 1 });

const BookedCall = mongoose.model('BookedCall', bookedCallSchema);

export default BookedCall;

