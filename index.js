const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const admimRoute = require("./routes/adminRoute");
const discoverRoute = require("./routes/discoverRoute");
const initialization = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

initialization();

app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active"
    });
});

app.use("/api/admin", admimRoute);
app.use("/api/discover", discoverRoute);

app.use((req, res, next) => {
    res.status(404).send("You are looking for something that we dont have!!!");
})
app.use((err, req, res, next) => res.status(500).send("Something went wrong!. Please try again later"));

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, () => {
    console.log("Express server is running on port 8000");
});