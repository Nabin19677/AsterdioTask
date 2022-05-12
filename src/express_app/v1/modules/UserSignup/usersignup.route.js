import express from "express";

import { userSignupController } from "./usersignup.controller.js";

const Router = express.Router();

Router.get("", userSignupController);

export default Router;
