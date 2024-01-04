import { MongoClient } from "mongodb";

let _db;

export const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://hotza:CyDL07ln3IcWDfli@cluster0.fim2wqe.mongodb.net/?retryWrites=true&w=majority",
  )
    .then((client) => {
      console.log("Connected");
      callback();
      _db = client.db("shop");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getDb = () => {
  if (!_db) {
    throw "No database found!";
  }

  return _db;
};
