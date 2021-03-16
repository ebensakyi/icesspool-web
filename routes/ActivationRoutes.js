const ActivationController = require('../controllers/ActivationController');

module.exports = (app) => {
    //app.post('/api', UserController.CreateUser)
    app.post('/api/v1/activate', ActivationController.activateUser);
    app.post('/api/v1/resend-code', ActivationController.resendCode);

    app.get('/activation-codes', ActivationController.getActivationCodePage);


};