const { Transaction } = require("../db/models");
const { RatingBreakdown } = require("../db/models");
const { Rating } = require("../db/models");
const { ProviderRating } = require("../db/models");

exports.saveRating = async (req, res) => {
  try {
    console.log(req.body);
    let cashDemand = req.body.cashDemand;
    let damageProperty = req.body.damageProperty;
    let abusive = req.body.abusive;
    let cleanEnvironment = req.body.cleanEnvironment;
    let closeOpenSeal = req.body.closeOpenSeal;
    let helmet = req.body.helmet;
    let boots = req.body.boots;
    let overall = req.body.overall;
    let respirator = req.body.respirator;
    let eyesProtector = req.body.eyesProtector;
    let transactionId = req.body.transactionId;

    let rating =
      (await ((cashDemand +
        damageProperty +
        abusive +
        cleanEnvironment +
        closeOpenSeal +
        helmet +
        boots +
        overall +
        respirator +
        eyesProtector) /
        10)) * 5;

    let transaction = await Transaction.findOne({
      where: { id: transactionId },
    });

    //console.log("RATING>>>>> ", rating);
    const theRating = await Rating.create({ transactionId, rating });

    await RatingBreakdown.create({
      ratingId: theRating.id,
      cashDemand,
      damageProperty,
      abusive,
      cleanEnvironment,
      closeOpenSeal,
      helmet,
      boots,
      overall,
      respirator,
      eyesProtector,
    });
    let providerRating = await ProviderRating.findOne({
      where: { providerId: transaction.providerId },
    });
   
    let currentProviderRating = Number(providerRating.rating);

    let newRating = (await (rating + currentProviderRating)) / 2;

    await ProviderRating.update(
      { rating: newRating },
      { where: { providerId: transaction.providerId } }
    );

    res
      .status(200)
      .send({ statusCode: 1, message: "Rating submitted successfully" });

    //calculate rating
  } catch (error) {
    //console.log("RAATAING err", error);

    res.status(400).send({ statusCode: 0, message: "A server error occured." });
  }
};
