module.exports.route = app => {

app.get("/privacyPolicy", function(req, res, next) {
   res.render('privacyPolicy') 
  });


}