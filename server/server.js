
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routers/questionform");
const connectDb = require("./utils/db");

// let's tackle cors
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:5001",
      "http://localhost:3000"

    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute);


const PORT = 5001;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
