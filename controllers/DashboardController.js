const Helper = require("../utils/Helper");
const { User } = require("../db/models");
const { Provider } = require("../db/models");
const { Client } = require("../db/models");
const { Transaction } = require("../db/models");

exports.getDashboardPage = async (req, res) => {
  await Helper.isLogin(req, res);

  //res.send(req.session.user)
  res.render("dashboard", { user: req.session.user });
};

exports.getDashboardData = async (req, res) => {
  let providersTotalCount = await Provider.count({ where: { deleted: 0 } });
  let clientsTotalCount = await Client.count({ where: { deleted: 0 } });

  let activeProvidersCount = await User.count({
    where: { userTypeId: 2, activated: 1, deleted: 0 },
  });
  let inactiveProvidersCount = await User.count({
    where: { userTypeId: 2, activated: 0, deleted: 0 },
  });

  let activeClientsCount = await User.count({
    where: { userTypeId: 3, activated: 1, deleted: 0 },
  });
  let inactiveClientsCount = await User.count({
    where: { userTypeId: 3, activated: 0, deleted: 0 },
  });

  let transactionsTotalCount = await Transaction.count({
    where: { deleted: 0 },
  });
  let offerMadeCount = await Transaction.count({
    where: { currentStatus: 3, deleted: 0 },
  });
  let offerInplaceCount = await Transaction.count({
    where: { currentStatus: 3, deleted: 0 },
  });
  let offerClosedCount = await Transaction.count({
    where: { currentStatus: 3, deleted: 0 },
  });

  res.send({
    providersTotalCount,
    clientsTotalCount,
    activeProvidersCount,
    inactiveProvidersCount,
    activeClientsCount,
    inactiveClientsCount,
    transactionsTotalCount,
    offerMadeCount,
    offerInplaceCount,
    offerClosedCount,
  });
};
