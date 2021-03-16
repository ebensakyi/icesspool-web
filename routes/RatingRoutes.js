const RatingController = require('../controllers/RatingController');

module.exports = (app) => {
  //mobile
 
  app.post('/api/v1/provider/rating', RatingController.saveRating);
}