import mongoose from "mongoose";

const connection = mongoose.connect(process.env.MONGOURL);

export default connection;
