const LocationController = require('../controllers/LocationController');

module.exports = (app) => {
    app.get('/api/v1/regions', LocationController.getRegionList);
    app.get('/api/v1/districts', LocationController.getDistrictList);
    app.get('/api/v1/districts/:id', LocationController.getDistrictListByRegion);

};