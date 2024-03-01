import express from "express";
const router = express.Router();

import middleware from "../middlewares/index.js";

import {
  generateRefreshToken,
  logout,
  signin,
  signup,
} from "../controllers/authController.js";
import { findUser, updateProfile } from "../controllers/userController.js";
import {
  getProducts,
  getSingleProduct,
} from "../controllers/productsController.js";

router.post("/auth/signup", signup);

router.post("/auth/signin", signin);

router.post("/auth/refresh", generateRefreshToken);

router.delete("/auth/logout", logout);

router.post("/user/profile", middleware, (req, res) => {
  findUser(req, res);
});

router.post("/user/profile/update", middleware, (req, res) => {
  updateProfile(req, res);
});

router.get("/products", getProducts);

router.post("/products/single", getSingleProduct);

export default router;
