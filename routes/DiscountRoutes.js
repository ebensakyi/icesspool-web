const DiscountController = require('../controllers/DiscountController');

module.exports = (app) => {
   
    app.get('/discount', DiscountController.getDiscountPage);
   app.post('/discount', DiscountController.updateDiscount);

};