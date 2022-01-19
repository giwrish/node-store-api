const mongoose = require("mongoose");

const connectDatabase = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectDatabase;
