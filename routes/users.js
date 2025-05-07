const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();

// POST /users/signin
router.post("/signin", (req, resp) => {
  const { email, passwd } = req.body;
  //   console.log(req.url + " - " + req.method + " : " + email + " & " + passwd);
  db.query("SELECT * FROM user WHERE email=?", [email], (err, results) => {
    if (err) return resp.send(apiError(err));

    // check that user sapdla ka?
    if (results.length !== 1) return resp.send(apiError("Invalid email"));
    const dbuser = results[0];

    // sapadla ata password check
    if (passwd !== dbuser.password)
      // password not matching
      return resp.send(apiError("Invalid password"));
    resp.send(apiSuccess(dbuser)); // password matched for this user
  });
});

// post/ users/signup
router.post("/signup", (req, resp) => {
  const { fname, lname, email, passwd, mobile, addr } = req.body;

  db.query(
    "INSERT INTO user (firstName, lastName, email, password, phoneno, address) VALUES (?, ?, ?, ?, ?, ?)",
    [fname, lname, email, passwd, mobile, addr],
    (err, result) => {
      if (err) return resp.send(apiError(err));
      console.log(result);
      // if user inserted successfully, return new user object
      if (result.affectedRows === 1) {
        db.query(
          "SELECT * FROM user WHERE id=?",
          [result.insertId],
          (err, results) => {
            // console.log(result);
            if (err) return resp.send(apiError(err));
            resp.send(apiSuccess(results[0]));
          }
        );
      }
    }
  );
});

//edit user based on provided value
router.put("/:id", (req, resp) => {
  const { fname, lname, email, passwd, mobile, addr } = req.body;
  db.query(
    "UPDATE user SET firstName = ?, lastName = ?, email = ?, password = ?, phoneno = ?, address = ? WHERE id = ?",
    [fname, lname, email, passwd, mobile, addr, [req.params.id]],
    (err, result) => {
      if (err) return resp.send(apiError(err));

      // success
      if (result.affectedRows === 1) {
        db.query(
          "SELECT * FROM user WHERE id=?",
          [req.params.id],
          (err, results) => {
            // console.log(result);
            if (err) return resp.send(apiError(err));
            resp.send(apiSuccess(results[0]));
          }
        );
      }
    }
  );
});

module.exports = router;
