import morgan from "morgan";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import models from "../db/models.js";
import passport from "passport";

const isDev = process.env.NODE_ENV.trim() === "development";
const isProd = process.env.NODE_ENV.trim() === "production";

export default (app) => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }
  if (isDev) {
    app.use(morgan("dev"));
  }
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.set("port", process.env.PORT || 8000);
  app.use(passport.initialize());
  // Adding Add Models for Easy Access
  app.use((req, res, next) => {
    req.models = models;
    next();
  });
};
