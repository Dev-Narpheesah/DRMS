const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/data', require('./routes/reportRoute'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));







// Endpoint to get all disaster reports
app.get('/api/disasters', async (req, res) => {
    const disasters = await Disaster.find().sort({ timestamp: -1 });
    res.json(disasters);
});

// Endpoint to create a new disaster report
app.post('/api/disasters', async (req, res) => {
    const { location, description } = req.body;
    const disaster = new Disaster({ location, description });
    await disaster.save();
    res.json(disaster);
});




// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const corsOptions = require("./config/corsOptions");
// const connectDb = require("./config/ConnectDB");
// const errorHandler = require("./middleware/errorMiddleware");
// const adminRoute = require("./routes/adminRoute");
// const userRoute = require("./routes/userRoute");
// const authRoute = require("./routes/authRoute");
// const studentRoute = require("./routes/studentRoute");

// const PORT = process.env.PORT || 4500;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(cors(corsOptions))
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//     methods: ["GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD"],
//   })
// );

// const app = express();

// app.use(express.json());

// app.use(cookieParser());
// app.get("/", (req, res) => {
//   res.send("Hello Boss🤭!");
// });

// app.use("/admin", adminRoute);
// app.use('/api/auth', authRoute);
// app.use("/users",userRoute );

// app.use("/", studentRoute);

// connectDb();

// app.use(errorHandler);
// mongoose.connection.once("open", () => {
//   console.log("Database Connected!");

//   app.listen(PORT, () => console.log(`Server running on ${PORT}`));
// });
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });






