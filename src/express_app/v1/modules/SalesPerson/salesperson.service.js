import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import models from "../../../../db/models.js";

const { SalesPerson } = models;
const localOpts = {
  usernameField: "email",
};

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const localStrategyUser = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const salesPerson = await SalesPerson.findOne({
        email,
      });
      if (!salesPerson || !(await salesPerson.authenticateUser(password))) {
        return done(null, false);
      }
      return done(null, salesPerson);
    } catch (e) {
      return done(e, false);
    }
  }
);

const jwtStrategyUser = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const salesPerson = await SalesPerson.findById(payload._id);
    if (!salesPerson) {
      throw new Error("User Not Found");
    }
    return done(null, salesPerson);
  } catch (e) {
    return done(e, false);
  }
});

passport.use("user-local", localStrategyUser);
passport.use("user-jwt", jwtStrategyUser);

export const userAuthLocal = passport.authenticate("user-local", {
  session: false,
});

export const userAuthJwt = passport.authenticate("user-jwt", {
  session: false,
});
