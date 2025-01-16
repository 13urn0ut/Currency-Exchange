const express = require("express");
const {
  getBaseRates,
  checkParams,
  checkBody,
  convertCurrency,
} = require("../controllers/controller");

const router = express.Router();

router.route("/exchange-rates/:base").get(checkParams, getBaseRates);
router.route("/convert").post(checkBody, convertCurrency);

module.exports = router;
