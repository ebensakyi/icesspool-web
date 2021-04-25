const CommissionController = require('../controllers/CommissionController');

module.exports = (app) => {
  
    app.get('/commission', CommissionController.getCommission)
    app.post('/commission', CommissionController.setCommission)

};