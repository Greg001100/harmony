
const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router();
const db = require("../models");

const { User, Server_User } = db;

const userValidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a User Name")
    .isLength({ max: 50 })
    .withMessage("User name must not be more than 50 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { userName: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use."
          );
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use."
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
];

const loginValidators = [
    check("email")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a value for Email Address"),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a value for Password"),
  ];

//create new user
router.post(
  "/signup",
  userValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const validatorErrors = validationResult(req)

    if(validatorErrors.isEmpty()){
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.build({ userName, email, hashedPassword });
      const {jti, token} = getUserToken(user);
      user.token = jti;
      await user.save();
      await Server_User.create({serverId:1, userId: user.id})
      res.json({ token, user});
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.json({errors})
    }
  })
);

//log in user
router.post(
  "/login",
  loginValidators,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      res.status = 401;
      return next(err)
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.hashedPassword.toString()
    )

    if (!passwordMatch) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      res.status = 401;
      return next(err);
    }

    const {jti, token} = getUserToken(user);
    user.token = jti;
    await user.save();
    res.json({ token, user});
  })
);

//log out user
router.delete('/logout', requireAuth, asyncHandler(async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.json({message: 'successfully logged out'})
}))

module.exports = router;
