const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();

//viewAllFavorite
router.get("/:userId", (req, resp) => {
  db.query("SELECT  ");
});
