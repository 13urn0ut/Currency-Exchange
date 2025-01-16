const {
  getSupportedCodes,
  getExchangeRates,
  getConversionRate,
} = require("../models/model");
const AppError = require("./../utils/appError");

exports.checkParams = async (req, res, next) => {
  const base = req.params.base.toUpperCase();

  try {
    const supportedCodes = await getSupportedCodes();

    if (!supportedCodes.includes(base))
      throw new AppError(400, "Unsupported currency");
    next();
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.checkBody = async (req, res, next) => {
  const { base, target, amount } = req.body;
  try {
    const supportedCodes = await getSupportedCodes();

    if (
      !supportedCodes.includes(base.toUpperCase()) ||
      !supportedCodes.includes(target.toUpperCase()) ||
      isNaN(amount) ||
      +amount < 0
    )
      throw new AppError(400, "Unsupported currency or invalid amount");
    next();
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getBaseRates = async (req, res) => {
  const base = req.params.base.toUpperCase();
  try {
    const data = await getExchangeRates(base);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.convertCurrency = async (req, res) => {
  const { base, target, amount } = req.body;
  try {
    const rate = await getConversionRate(base, target);

    res.status(200).json({
      status: "success",
      data: {
        base,
        target,
        amount,
        convertedAmount: (+amount * +rate).toFixed(2),
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};
