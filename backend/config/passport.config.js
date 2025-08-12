// src/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

// You should replace this with actual user DB logic
const findOrCreateUser = async (profile) => {
  // Example: find user by google id or create new user in DB
  // return user;
  console.log("User profile:", profile);
  return profile; // placeholder, just returning profile for demo
};

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:"/auth/google/callback",
      scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Access Token:", accessToken);
        console.log("Google Refresh Token:", refreshToken);
        console.log("Google Profile:", profile);
        const user = await findOrCreateUser(profile);
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  // Typically, save user.id only
  done(null, user.id || user);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Typically, find user by id in DB
    // const user = await User.findById(id);
    const user = id; // placeholder
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
