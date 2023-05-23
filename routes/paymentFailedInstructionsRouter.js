module.exports.route = (app) => {
  app.get("/paymentFailedInstruction", async (req, res, next) => {
    res.render("paymentFailedInstruction");
  });
};
