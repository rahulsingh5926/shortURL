const { nanoid } = require("shortid");
const URL = require("../model/url");
const shortid = require("shortid");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(404).json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render('home',{
    id:shortID
  })

}
async function getAnalytic(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log(result);
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = { handleGenerateNewShortURL, getAnalytic };
