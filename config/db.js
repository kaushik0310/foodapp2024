const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log("DB error", error, colors.bgRed);
  }
};
module.exports = connectDB;
//export default connectDB; ec6
