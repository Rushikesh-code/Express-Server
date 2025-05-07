const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();

//viewAllFavorite
router.get("/viewAll", (req, resp) => {
  db.query(
    "SELECT f.id, q.id, q.author, q.contents, q.userId, q.createdTime, u.id, u.firstName, u.lastName, u.email, u.phoneno, u.address FROM favourite f INNER JOIN user u ON f.userId = u.id INNER JOIN quote q ON f.quoteId = q.id",
    (err, result) => {
      if (err) return resp.send(apiError(err));

      // success
      resp.send(apiSuccess(result));
    }
  );
});

module.exports = router;
