import express from "express";
import {
  signUp,
  login,
  createNewCategory,
  genLinkForCategory,
  getStatistics,
} from "./salesperson.controller.js";

//Services
import { userAuthLocal, userAuthJwt } from "./salesperson.service.js";

//Validators
import salespersonRouteValidation from "./salesperson.validation.js";

const Router = express.Router();

Router.post("/auth/signup", signUp);
Router.post("/auth/login", userAuthLocal, login);

Router.get("/statistics", userAuthJwt, getStatistics);

Router.post("/category", userAuthJwt, createNewCategory);
Router.post(
  "/category/generate-link/:categoryId",
  userAuthJwt,
  genLinkForCategory
);

export default Router;
