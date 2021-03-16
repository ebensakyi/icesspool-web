const WithdrawalController = require('../controllers/WithdrawalController');

module.exports = (app) => {
    app.post('/api/v1/provider/create-withdrawal', WithdrawalController.createWithdrawal);
    app.get('/api/v1/provider/balance', WithdrawalController.getBalance);


    app.get('/withdrawal-requests', WithdrawalController.getWithdrawalRequests);
    app.get('/provider-wallet', WithdrawalController.getProviderBalance)
    app.get('/disbursement', WithdrawalController.getDisbursements)
    app.post('/approve-withdrawal', WithdrawalController.approveWithdrawal)

};