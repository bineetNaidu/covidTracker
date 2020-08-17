const express = require("express");
const path = require("path");
const app = express();
const getCovidData = require("./apiCovid");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendfile("index.html");
});

app.get("/api/v1/states", async (req, res) => {
    try {
        const response = await getCovidData();
        res.json(response);
    } catch (error) {
        res.status(404).send("Something weng worng");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("COVID_TRACKER is spinning up");
});
