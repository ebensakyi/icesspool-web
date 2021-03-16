const { Discount } = require("../models");

exports.perform = async () => {
  await Discount.create({
    id: 1,
    trip1: 0,
    trip2: 0.05,
    trip3: 0.08,
    trip4: 0.1,
    trip5: 0.12,
    beyond5: 0.12,

  });
};
