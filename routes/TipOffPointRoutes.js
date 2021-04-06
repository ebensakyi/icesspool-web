const TipOffPointController = require('../controllers/TipOffPointController');

module.exports = (app) => {
    app.get('/api/v1/tipoff-points', TipOffPointController.getTipOffPoints);
    app.put('/api/v1/tipoff-points/:id', TipOffPointController.updateTipOffPoint);


    app.get('/tipoffpoints', TipOffPointController.getTipOffpointsPage);
    app.get('/tipoffpoints/data', TipOffPointController.getTipOffPoints);
    app.post('/tipoffpoints', TipOffPointController.saveTipOffPoint);
    app.delete('/tipoffpoints', TipOffPointController.deleteTipOffPoint);

};