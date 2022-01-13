const PaymentController = require('../controllers/PaymentController');

module.exports = (app) => {
    app.get('/api/v1/initiate-teller-payment', PaymentController.initiatePayment);
    app.get('/api/v1/complete-payment', PaymentController.completePayment);
    app.post('/api/v1/complete-payment', PaymentController.completePaymentWebhooks);

    app.get('/payment-success', PaymentController.paymentSuccess);
    app.get('/payment-failed', PaymentController.paymentFailed);
    app.post("/payment-manual-push-tx", PaymentController.manualCompletePayment);

};