const axios = require("axios");
require("dotenv").config();

const key = process.env.API_KEY;

exports.getSupportedCodes = async () => {
  const {
    data: { supported_codes },
  } = await axios.get(`https://v6.exchangerate-api.com/v6/${key}/codes`);

  const codes = supported_codes.map((arr) => arr[0]);

  return codes;
};

exports.getExchangeRates = async (currency) => {
  const {
    data: { base_code: base, conversion_rates: rates },
  } = await axios.get(`
    https://v6.exchangerate-api.com/v6/${key}/latest/${currency}
    `);

  return { base, rates };
};

exports.getConversionRate = async (base, target) => {
  const {
    data: { conversion_rate: rate },
  } = await axios.get(`
    https://v6.exchangerate-api.com/v6/${key}/pair/${base}/${target}
    `);

  return rate;
};
