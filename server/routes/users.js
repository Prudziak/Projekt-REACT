const router = require(`express`).Router();

const userModel = require(`../models/users`);

const bcrypt = require(`bcryptjs`);

router.get(`/users`, (req, res) => {
  userModel.find((error, data) => {
    res.json(data);
  });
});

router.post(`/users/add_admin`, (req, res) => {
  const adminPassword = `Haselko123!`;
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
  `/users/register/:username/:email/:password/:firstname/:lastname`,
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
      bcrypt.compare(req.params.password, data.password, (err, result) => {
        if (result) {
          res.json({ username: data.username, accessLevel: data.accessLevel });
        } else {
          res.json({ errorMessage: `Wrong password` });
        }
      });
    } else {
      console.log("User not found in db");
      res.json({ errorMessage: `User is not logged in` });
    }
  });
});

router.delete(`/users/:id`, (req, res, next) => {
  userModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    }
    return res.json(data);
  });
});

router.post(`/users/logout`, (req, res) => {
  res.json({});
});

module.exports = router;
