import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();
const uriDB =
  "mongodb+srv://riziq:riziq@cluster0.1xlvx.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uriDB);

app.use(cors());

client.connect().then(() => {
  console.log("Connected to DB");
  const db = client.db("tes");
  app.get("/pesan", (req, res) => {
    db.collection("halo")
      .find()
      .toArray((err, result) => {
        res.json(result);
      });
  });

  app.post("/pesan", (req, res) => {
    db.collection("pesan")
      .insertOne({
        nama: req.query.pesan,
      })
      .then(() => {
        res.send("Data berhasil ditambahkan");
      });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
