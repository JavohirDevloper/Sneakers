const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://muhammadiyevj768:javohir@cluster0.zsqwh6z.mongodb.net/shoping",
      {
        useNewUrlParser: true,
      }
    );

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
