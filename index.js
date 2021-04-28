// index.js

/*
 * Required External Modules
 */
let serverAddress = '';
let connected     = false;
const express     = require("express");
const path        = require("path");
const axios       = require("axios");

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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*
 * Routes Definitions
 */
app.get("/", async (req, res) => {
    let pageData = { title: 'Home', connected: connected };
    if (connected) {
        // get system status
        let soteriaStatus;
        await getStatus(serverAddress).then(function(data) {
            soteriaStatus = data;
        }).catch((err) => { console.log(err); });

        // TODO: get something else lol

        // collection of page information to print to page
        pageData.status   = 'Live';
        pageData.address  = serverAddress;
        pageData.numNodes = soteriaStatus.length;
        pageData.nodeList = soteriaStatus;
    }

    res.render("index", pageData);
});

// 'connects' Crust to Mantle web server
app.post("/connect", async (req, res) => {
    // store web server address/port
    serverAddress = `${req.body.address}:${req.body.port}`;

    // ping server to see if live
    await getStatus(serverAddress).then(function(data) {
        connected = true;
    }).catch((err) => { console.log(err); });

    res.redirect("./");
});

// 'disconnects' from Mantle Web Server
app.get("/disconnect", (req, res) => {
    connected = false;
    res.redirect("./");
});


app.get("/nodes", (req, res) => {
    res.render("nodes");
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
async function getStatus(address) {
    const response = await axios.get(`${address}/api/v1/status`);
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