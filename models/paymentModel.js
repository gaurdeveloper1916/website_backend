const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'debit_card', 'paypal', 'upi', 'net_banking', 'wallet'],
            require: true
        },
        transactionId: {
            type: String,
            unique: true,
            require: true
        },
        amount: {
            type: Number,
            require: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentGatewayResponse: {
            type: Object,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },

    },
    {
        timestamps: true, 
    }
)
const Payment = mongoose.model('Payment',paymentSchema);

module.exports = Payment;
