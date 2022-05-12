import mongoose from "mongoose";

const DB_ERROR_HANDLER = (err) => {
  console.log(err.message);
  if (err.message.code == "ETIMEDOUT") {
    mongoose.connect(process.env["MONGOURL"]);
  } else {
    process.exit(1);
  }
};

export default DB_ERROR_HANDLER;
