import mongoose from 'mongoose';

const eocSchema = new mongoose.Schema({
    dateOfCall: {
        type: String,
        required: true,
        unique: false
    },
    calendar: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    closer: {
        type: String,
        required: false
    },
    callOutcome: {
        type: String,
        required: false
    },
    objections: {
        type: String,
            required: false
    },
    callRecording: {
        type: String,
        required: false
    },
    rawWebhookData: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
eocSchema.index({ dateOfCall: -1 });
eocSchema.index({ calendar: 1 });
eocSchema.index({ fullName: 1 });

eocSchema.index({ phoneNumber: 1 });
eocSchema.index({ emailAddress: 1 });

eocSchema.index({ notes: 1 });

eocSchema.index({ closer: 1 });

eocSchema.index({ callOutcome: 1 });

eocSchema.index({ objections: 1 });

eocSchema.index({ callRecording: 1 });

eocSchema.index({ rawWebhookData: 1 });

const Eoc = mongoose.model('Eoc', eocSchema);

export default Eoc;