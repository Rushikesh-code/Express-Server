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

// Delete Quote
router.delete("/:id", (res, resp) => {
  db.query("DELETE FROM quote WHERE id = ?", [id], (err, result) => {
    if (err) return resp.send(apiError(err));

    // Success
    if (result.affectedRows !== 1) return resp.send(apiError("Not Deleted"));
    return resp.send(apiSuccess("Quote is Deleted"));
  });
});
module.exports = router;
