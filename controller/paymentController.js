const crypto = require('crypto');
const razorpayInstance = require("../config/razorpayConfig");

const createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount * 100, 
            currency: currency || 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET) 
            .update(body)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
};





module.exports = { createOrder, verifyPayment }
