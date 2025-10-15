import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  // GHL webhook data fields
  callId: {
    type: String,
    required: true,
    unique: true
  },
  salesRep: {
    type: String,
    required: true
  },
  salesRepId: String,
  customerName: String,
  customerPhone: String,
  outcome: {
    type: String,
    enum: ['completed', 'no_answer', 'voicemail', 'interested', 'not_interested', 'callback', 'qualified', 'not_qualified'],
    default: 'completed'
  },
  revenue: {
    type: Number,
    default: 0
  },
  callDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  // Additional fields
  notes: String,
  tags: [String],
  // Store the raw webhook data for reference
  rawWebhookData: {
    type: mongoose.Schema.Types.Mixed
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Add indexes for better query performance
callSchema.index({ callDate: -1 });
callSchema.index({ salesRep: 1 });
callSchema.index({ outcome: 1 });

const Call = mongoose.model('Call', callSchema);

export default Call;



