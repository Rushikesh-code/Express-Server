const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();

// View All Quote
router.get("/getAll", (req, resp) => {
  db.query("SELECT * FROM quote", (err, result) => {
    if (err) return resp.send(apiError(err));

    // sagle bhetle Success
    return resp.send(apiSuccess(result));
  });
});

// Edit Quote
router.patch("/editQuote", (req, resp) => {
  const { id, contents } = req.body;
  db.query(
    "UPDATE quote SET contents = ? WHERE id = ?",
    [contents, id],
    (err, result) => {
      if (err) return resp.send(apiError(err));

      if (result.affectedRows !== 1)
        return resp.send(apiError("Content Not Updated"));
      return resp.send(apiSuccess("Content is Updated"));
    }
  );
});

// Add Quote
router.post("/addQuote", (req, resp) => {
  const { author, contents, userId } = req.body;
  db.query(
    "INSERT INTO quote(author, contents, userId, createdTime) VALUES(?, ?, ?, NOW())",
    [author, contents, userId],
    (err, result) => {
      if (err) return resp.send(apiError(err));

      // if Success
      if (result.affectedRows === 1) {
        db.query(
          "SELECT * FROM user WHERE id = ?",
          [result.insertId],
          (err, results) => {
            if (err) return resp.send(apiError(err));
            return resp.send(apiSuccess(results[0]));
          }
        );
      }
    }
  );
});

// Delete Quote
router.delete("/:id", (req, resp) => {
  db.query("DELETE FROM quote WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return resp.send(apiError(err));

    // Success
    if (result.affectedRows !== 1) return resp.send(apiError("Not Deleted"));
    return resp.send(apiSuccess("Quote is Deleted"));
  });
});

module.exports = router;
