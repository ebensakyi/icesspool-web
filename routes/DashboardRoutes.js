const DashboardController = require('../controllers/DashboardController');

module.exports = (app) => {
  
    app.get('/dashboard', DashboardController.getDashboardPage);
    app.get('/api/dashboard', DashboardController.getDashboardData);


};