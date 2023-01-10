const router = require(`express`).Router();
let createError = require("http-errors");

const userModel = require(`../models/users`);

const bcrypt = require(`bcryptjs`);
const { response } = require("express");

router.get(`/users`, (req, res) => {
  userModel.find((error, data) => {
    res.json(data);
  });
});

router.post(`/users/add_admin`, (req, res) => {
  const adminPassword = `123!@#qweQWE`;
  bcrypt.hash(
    adminPassword,
    parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
    (error, hash) => {
      userModel.create(
        {
          username: "Admin",
          email: "admin@admin.com",
          password: hash,
          accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN),
        },
        (createError, createData) => {
          if (createData) {
            res.json(createData);
          } else {
            res.json({ errorMessage: `Failed to create admin user` });
          }
        }
      );
    }
  );
});

router.post(
  `/users/register/:username/:email/:password/:firstname/:lastname/:address`,
  (req, res) => {
    userModel.findOne(
      { email: req.params.email },
      (uniqueError, uniqueData) => {
        if (uniqueData) {
          res.json({ errorMessage: `User already exists` });
        } else {
          bcrypt.hash(
            req.params.password,
            parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
            (error, hash) => {
              userModel.create(
                {
                  username: req.params.username,
                  email: req.params.email,
                  password: hash,
                  firstname: req.params.firstname,
                  lastname: req.params.lastname,
                  address: req.params.address,
                },
                (error, data) => {
                  if (error) {
                    return next(error);
                  }
                  res.json(data);
                }
              );
            }
          );
        }
      }
    );
  }
);

router.post(`/users/login/:email/:password`, (req, res) => {
  userModel.findOne({ email: req.params.email }, (error, data) => {
    if (data) {
      bcrypt.compare(req.params.password, data.password, (error, result) => {
        if (result) {
          res.json({ username: data.username, accessLevel: data.accessLevel });
        } else {
          res.json({ errorMessage: `User is not logged in` });
        }
      });
    } else {
      console.log("User not found in db");
      res.json({ errorMessage: `User is not logged in` });
    }
  });
});

router.post(`/users/logout`, (req, res) => {
  res.json({});
});

module.exports = router;
