const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const userController = require('../api/registration');
const verifcationController = require('../api/verification');
const route = express.Router();

//register route

route
.post(async (req, res) => {
  const userReg = new userController(req.body, req.headers);
  const result = await userReg.register();

  res.status(result.code).json({
    result: result.result,
    code: result.code,
    message: result.message,
  });
});

//to verfy user activation link
route
.post( async (req, res) => {
  const verification = await verifcationController.verifyEmail(
    req.body.email,
    req.body.code,
  );

  res.status(verification.code).json({
    result: verification.result,
    code: verification.code,
    message: verification.message,
  });
});

module.exports = route;