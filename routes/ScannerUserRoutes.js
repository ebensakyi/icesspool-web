const ScannerUserController = require("../controllers/ScannerUserController");
const Validator = require("../controllers/Validator");

module.exports = (app) => {
  app.get("/scanners", ScannerUserController.scannersPage);
  app.post("/scanners", ScannerUserController.addScannerUser);
  app.get("/scanners/del/:id", ScannerUserController.deleteScannerUser);
};
