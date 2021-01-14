import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import passport from 'passport'
import session from 'express-session'
import path from 'path';
// import movies from "../src/api/movies.route"
// import users from "../src/api/users.route"
import authRouter from './api/auth.route';
const app = express()

app.use(cors())
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret:"123409088"}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

// Register api routes
// app.use("/api/v1/movies", movies)
// app.use("/api/v1/user", users)
// app.use("/status", express.static("build"))
app.get("/hi", (req, res) => res.send(path.join(__dirname, "..", "website", "public", "index.html")) )
app.get("/", (req, res) => res.redirect(process.env.CLIENT_APP_URL));
app.get('/me', (req, res) =>  console.log(req.user))
// app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
