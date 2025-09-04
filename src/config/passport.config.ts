import passport from "passport";
import Google from "passport-google-oauth20";
import { envVars } from "./env.config";
const GoogleStrategy = Google.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.AUTH_GOOGLE_ID as string,
      clientSecret: envVars.AUTH_GOOGLE_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google profile", profile);
      console.log({ accessToken, refreshToken });
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});
