const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//* middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w3d5mtp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


 
async function run() {
  try {
    const productCollection = client.db("reselldotcom").collection("products");

    const categoryCollection = client.db("reselldotcom").collection("category");

 

    app.post("/addproduct", async (req, res) => {
      const products = req.body;
      console.log(products);

      const result = await productCollection.insertOne(products);
      res.send(result);
    });

    //* read all category data
    app.get("/category", async (req, res) => {
      const query = {};
      const cursor = categoryCollection.find(query);
      const productCategory = await cursor.toArray();
      res.send(productCategory);
    });

    //* specific  data read services
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { id: id };
      const service = await productCollection.find(query).toArray();
      res.send(service);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);








app.get("/", (req, res) => {
  res.send("Resell Dot Com server Running");
});

app.listen(port, () => {
  console.log(`Resell Dot Com  running on port ${port}`);
});