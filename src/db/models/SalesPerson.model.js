import { compare, hash, genSalt } from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import util from "util";
import Category from "./Category.model.js";

const jwtSign = util.promisify(jwt.sign);

const { Schema } = mongoose;

const salesPersonSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: [true, "FirstName is required!"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "LastName is required!"],
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "Password needs to be longer."],
    },
  },
  { timestamps: true }
);

salesPersonSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await this._hashPassword(this.password);
  }
  return next();
});

salesPersonSchema.methods = {
  async _hashPassword(password) {
    let salt = await genSalt(10);
    return hash(password, salt);
  },
  async authenticateUser(password) {
    let isAuthenticated = await compare(password, this.password);
    return isAuthenticated;
  },
  async createToken() {
    const token = await jwtSign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET // NOTE --> Use RSA256 with private key for production
    );
    return token;
  },
  async toAuthJSON() {
    const token = await this.createToken();
    return {
      _id: this._id,
      email: this.email,
      token,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
    };
  },
};

salesPersonSchema.virtual("createdLinks").get(function () {
  return 10;
});

export default mongoose.model("SalesPerson", salesPersonSchema);
