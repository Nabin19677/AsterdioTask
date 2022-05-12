import express from "express";

//modules
import salesPersonRoute from "./modules/SalesPerson/salesperson.route.js";
import userSignupRoute from "./modules/UserSignup/usersignup.route.js";

const v1App = express();

v1App.use("/salesperson", salesPersonRoute);
v1App.use("/signup", userSignupRoute);
export default v1App;
