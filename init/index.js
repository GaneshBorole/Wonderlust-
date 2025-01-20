const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/project";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initdb = async () => {
  await listing.deleteMany({});
  (initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6783a7a6343b9470e201cae4",
  }))),
    await listing.insertMany(initData.data);
  console.log("data was initalized");
};
initdb();
