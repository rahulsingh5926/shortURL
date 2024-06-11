const express = require("express");
const urlRoute = require("./router/url");
const staticRoute = require("./router/staticRouter");
const { connectToMongoDB } = require("./connect");
const app = express();
const URL = require("./model/url");
const port = 8001;
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToMongoDB("mongodb://127.0.0.1:27017/shortURL");

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );

  // res.redirect(entry.redirectURL);
});
app.listen(port, () => console.log("server has started"));
