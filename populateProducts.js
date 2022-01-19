require("dotenv").config();

const connectDatabase = require("./database/connection");
const Product = require("./model/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("db connected...");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
