const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

//rest object
const app = express();

//dot env configuration
dotenv.config();

//DB connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test",require("./routes/testRoutes"))
app.use("/api/v1/auth",require("./routes/authRoutes"))
app.use("/api/v1/auth",require("./routes/userRoutes"))

app.get("/",(req,res)=>{
    return res.status(200).send('<h1>welcome to food server app<h1>')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`.white.bgMagenta);
})