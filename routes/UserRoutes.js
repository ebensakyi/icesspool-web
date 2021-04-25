const UserController = require('../controllers/UserController');
const Validator = require("../controllers/Validator");

module.exports = (app) => {
  app.post('/api/v1/provider', Validator.validateUser, UserController.createProvider);


  app.post('/api/v1/client', Validator.validateUser, UserController.createClient);

  app.get('/api/v1/client', UserController.clientList);
  app.get('/api/v1/client/:id', UserController.getAClient);
  app.put('/api/v1/client/:id', Validator.validateUser, UserController.updateClient);
  app.delete('/api/v1/client/:id', UserController.deleteClient);

  app.get('/api/v1/scanner/:id', UserController.getAScanner);


};