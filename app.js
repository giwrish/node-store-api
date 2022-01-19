require("dotenv").config();
require("express-async-errors");
// async error

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const connectDatabase = require("./database/connection");
const router = require("./routes/products");

// middlewares
app.use(express.json());

//routes
app.use("/api/v1/products", router);

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const startApp = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
