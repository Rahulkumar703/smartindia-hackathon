import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    orgnisationId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "orgnisation is required"],
        trim: true,
        ref: 'organisation'
    },
    studentName: {
        type: String,
        required: [true, "student is required"],
        trim: true,
        lowercase: true
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



const Certificate = mongoose.models.certificate || mongoose.model('certificate', CertificateSchema);
export default Certificate;