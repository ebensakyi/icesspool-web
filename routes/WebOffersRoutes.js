const WebOffersController = require('../controllers/WebOffersController');

module.exports = (app) => {
    app.get('/active-offers', WebOffersController.activeOffersPage)
    app.get('/closed-offers', WebOffersController.closedOffersPage)
    app.get('/cancelled-offers', WebOffersController.cancelledOffersPage)

};