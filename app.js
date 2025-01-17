const express = require("express");
const rateLimit = require("express-rate-limit");
const router = require("./routers/router");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) =>
    res.json({
      status: "fail",
      message: "Too many requests, please try again later.",
    }),
});

app.use(limiter);

app.use(express.json());

app.use("/api/v1", router);

module.exports = app;
