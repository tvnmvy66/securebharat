import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    url : { type: String, maxlength: 50,required: true},
    status : {
        type: String,
        required: true,
        enum: ['Submitted', 'Proccessing', 'Completed', 'Cancelled'],
        default: 'Cancelled',
    },
    remark : { type: String, maxlength: 300 },
    link : { type: String },
    isCompleted: { type: Boolean, default: false}
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

export default Report;
