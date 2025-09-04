import passport from "passport";
import Google from "passport-google-oauth20";
const GoogleStrategy = Google.Strategy;

passport.use(
  new GoogleStrategy(
    { clientID: "", clientSecret: "", callbackURL: "" },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google profile", profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
