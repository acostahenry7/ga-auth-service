const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const User = require("./index");

router.get("/", listUsers);
router.post("/login", login);
router.post("/logout", logout);

function listUsers(req, res) {
  User.findAll()
    .then((list) => {
      response.success(req, res, 200, list);
    })
    .catch((err) => {
      response.error(req, res, 401, `Unauthorized access. ${err}`);
    });
}

function login(req, res) {
  console.log(req.body);

  let data = {
    companyDB: req.body.companyDB,
    password: req.body.password,
    username: req.body.username,
  };

  User.login(data)
    .then((session) => {
      response.success(req, res, 200, session);
    })
    .catch((err) => {
      response.error(req, res, 401, err);
    });
}

function logout(req, res) {
  User.logout()
    .then(() => {
      response.success(req, res, 200, "Logged out Succesfully!");
    })
    .catch((err) => {
      response.error(req, res, err?.code, err?.message);
    });
}

module.exports = router;
