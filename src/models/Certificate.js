import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    orgnisationId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "orgnisation is required"],
        trim: true,
        ref: 'organisation'
    },
    templateId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "template is required"],
        trim: true,
        ref: 'organisation.template'
    },
    certificateInfo: {
        type: Object,
        required: [true, "certificateInfo is required"],
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



const Certificate = mongoose.models.certificate || mongoose.model('certificate', CertificateSchema);
export default Certificate;