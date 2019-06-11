const express = require('express');
const session = require("express-session")
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const env = require('./env.json');

const app = express();
const port = env.PORT;

const FACEBOOK_APP_ID = env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = env.FACEBOOK_APP_SECRET;
const ROOT_URL = env.ROOT_URL;

app.use(session({ 
  secret: '666',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy(
  {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${ROOT_URL}/auth/facebook/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate(..., (err, user) => {
      // if (err) { return done(err); }
      done(null, profile);
    // });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // User.findById(id, function(err, user) {
    done(null, id);
  // });
});

app.get('/', (req, res) => 
  req.user ?
    res.sendFile('index.html', { root: __dirname }) :
    res.sendFile('login.html', { root: __dirname })
);

app.use('/assets', (req, res) => req.user ? express.static('assets')(req, res) : null)

app.use(express.static(__dirname));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/#fail'
  })
);


app.listen(port, () => console.log(`Listening on port ${port}`));
