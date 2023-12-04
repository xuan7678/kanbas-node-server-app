import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import session from "express-session";
import UserRoutes from "./users/routes.js";
import "dotenv/config";
import mongoose from "mongoose";

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
console.log(CONNECTION_STRING);
console.log(process.env.FRONTEND_URL);
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    }
));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(
    session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);
Lab5(app);
Hello(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000);
