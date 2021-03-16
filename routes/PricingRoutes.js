const PriceController = require('../controllers/PriceController');

module.exports = (app) => {
    app.post('/api/v1/price', PriceController.addPriceModel);
    app.get('/api/v1/price/:id', PriceController.getAPriceModel);
    app.get('/api/v1/price/', PriceController.getAllPriceModel);
    app.post('/api/v1/calc', PriceController.calculatePricing);
  
    app.get('/pricing', PriceController.getPriceModelPage);
    app.post('/pricing', PriceController.updatePriceModel);

};