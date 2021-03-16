module.exports.route = (app) => {


app.get('/dashboard', function(req, res, next) {
  res.render('dashboard')
});

}