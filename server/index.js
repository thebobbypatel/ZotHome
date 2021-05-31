const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const dotenv = require("dotenv");
dotenv.config();

const mongo = require('mongodb')

const prodMode = process.env.NODE_ENV === "production";
const app = express();
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')

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

    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

// includes for route files
const userRouter = require('./routes/UserRoutes')

// Initialize routes
app.use('/api', userRouter)

