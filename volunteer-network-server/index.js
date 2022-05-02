require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//  Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pcrdj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const eventCollection = client
      .db("volunteer-network")
      .collection("volunteer-activities");

    app.get("/event", async (req, res) => {
      const query = {};
      const cursor = eventCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

// Default server
app.get("/", (req, res) => {
  res.send("BooksKeeper");
});

app.listen(port, () => {
  console.log(`BooksKeeper app listening on port ${port}`);
});
