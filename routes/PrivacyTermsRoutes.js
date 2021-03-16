const Controller = require('../controllers/PrivacyTermsController');

module.exports = (app) => {
    app.get('/privacy', Controller.privacyPolicyPage);
    app.get('/terms', Controller.termPage);
  
};