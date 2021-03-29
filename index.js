// index.js

/*
 * Required External Modules
 */
const webserver = 'http://localhost:8080';
const express = require("express");
const path    = require("path");
const axios   = require("axios");

/*
 * App Variables
 */
const app  = express();
const port = process.env.PORT || "8000";

/*
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/*
 * Routes Definitions
 */
app.get("/", async (req, res) => {
    // get system status
    let soteriaStatus;
    await getStatus().then(function(data) {
        soteriaStatus = data;
    }).catch((err) => { console.log(err); });

    // get something else lol

    // collection of page information to print to page
    const pageData = {
        title: 'Home',
        status: (soteriaStatus.length > 0) ? "Live" : "Offline",
        numNodes: soteriaStatus.length,
        nodeList: soteriaStatus
    }
    res.render("index", pageData);
});

app.get("/nodes", (req, res) => {
    res.render("nodes", { title: "Nodes" });
});

/*
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

/*
 *  getStatus - pings status endpoint
 */
async function getStatus() {
    const response = await axios.get(`${webserver}/api/v1/status`);
    return response.data;
}

/*
 *  WebServer Endpoints:
 *      -  /api/v1/status
 *      -  /api/v1/delete/all
 *      -  /api/v1/add
 *      -  /api/v1/delete/{id}
 *      -  /api/v1/{id}/status
 *      -  /api/v1/{id}/add
 *      -  /api/v1/{id}/remove
 *      -  /api/v1/broadcast
 */