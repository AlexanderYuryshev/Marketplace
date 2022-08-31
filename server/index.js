const express = require("express");
const models = require("./models");
const authrouter = require("./routes/auth.routes.js");
const datarouter = require("./routes/data.routes.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", datarouter);
app.use("/", authrouter);

const port = 5005;

async function start() {
    try {
        await models.sequelize.authenticate();
        await models.sequelize.sync();
        app.listen(port, () => console.log(`Started on port ${port}`));
    } catch (e) {
        console.log("Server error:", e.message);
        process.exit(1);
    }
}

start();
