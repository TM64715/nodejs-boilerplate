import app from "./server"
import { MongoClient } from "mongodb"
// import MoviesDAO from "../src/dao/moviesDAO"
// import UsersDAO from "./dao/usersDAO"
// import CommentsDAO from "./dao/commentsDAO"
import UsersDAO from "./dao/usersDAO";
import ProjectDAO from './dao/projectsDAO'
import { Strategy } from "passport";

// const port = process.env.PORT || 8000
const port = 8000
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { Strategy as LocalStrategy } from 'passport-local';
import {compareHash} from './service/encrypt.service'
const bcrypt = require("bcrypt");
/**
Ticket: Connection Pooling

Please change the configuration of the MongoClient object by setting the
maximum connection pool size to 50 active connections.
*/

/**
Ticket: Timeouts

Please prevent the program from waiting indefinitely by setting the write
concern timeout limit to 2500 milliseconds.
*/

MongoClient.connect(
  process.env.EB_DB_URI,
  // TODO: Connection Pooling
  // Set the poolSize to 50 connections.
  // TODO: Timeouts
  // Set the write timeout limit to 2500 milliseconds.
  { useNewUrlParser: true, poolSize:50, wtimeout: 2500 },
)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(
      async client => {
          await UsersDAO.injectDB(client);
          await ProjectDAO.injectDB(client);
    // await MoviesDAO.injectDB(client)
    // await UsersDAO.injectDB(client)
    // await CommentsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
       const {error, result} = await UsersDAO.findOrCreate({ googleId: profile.id, displayName: profile.displayName  });
        done(error, result);
  }
));

passport.use(new LocalStrategy(
  async function(username, password, done) {
    let { error, result } = await UsersDAO.findByUsername(username);
    if (error) { return done(error)};
    
    if (!result) {return done(null, false)};
    
    let compareResult = await compareHash(password, result.hash)
    
    if (!(compareResult)) {return done(null, false)};
    
    return done(null, result);
  }
));



passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
    
  const {error, result} = await UsersDAO.findById(id)
  done(error, result);
});

