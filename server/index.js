const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

let prodMode = process.env.NODE_ENV === "production";
prodMode = true
const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

// includes for route files
const userRouter = require('./routes/UserRoutes')

// Initialize routes
app.use('/', userRouter)


// Set application port
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
    console.log(`app running on port ${app.get("port")}`);
});

// Configure client to use correct build directory
// if app is running in production mode
if (prodMode) {
    const path = require("path");
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}



