const express = require("express");
const { handleGenerateNewShortURL ,getAnalytic} = require("../controller/url");
const router = express.Router();
router.post("../controller/url");

router.post("/", handleGenerateNewShortURL);
router.get('/analytic/:shortId',getAnalytic)
module.exports = router;
