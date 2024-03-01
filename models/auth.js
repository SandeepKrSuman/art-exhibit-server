import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Token from "./token.js";

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

const authSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

authSchema.methods = {
  // -----------> Create Access Token Instance Method <-----------------------
  createAccessToken: async (foundUser) => {
    try {
      let payload = {
        email: foundUser.email,
      };
      let accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
      return accessToken;
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // -----------> Create Refresh Token Instance Method <-----------------------

  createRefreshToken: async (foundUser) => {
    try {
      let payload = {
        email: foundUser.email,
      };
      let refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: "1h",
      });
      await new Token({ token: refreshToken }).save();
      return refreshToken;
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

export default mongoose.model("Auth", authSchema);
