const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken")

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

    const usersCollection = client.db("reselldotcom").collection("users");

    const sellerCollection = client.db("reselldotcom").collection("sellers");

    const bookingCollection = client
      .db("reselldotcom")
      .collection("booked_products");

    app.post("/addproduct", async (req, res) => {
      const products = req.body;
      console.log(products);

      const result = await productCollection.insertOne(products);
      res.send(result);
    });

    //* Insert users in database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const category = req.body.category;

      if (category === "seller") {
        const result = await sellerCollection.insertOne(user);
        res.send(result);
      } else {
        const result = await usersCollection.insertOne(user);
        res.send(result);
      }
    });
    //* Get All users from database
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });
    //* Get All users from database
    app.get("/sellers", async (req, res) => {
      const query = {};
      const sellers = await sellerCollection.find(query).toArray();
      res.send(sellers);
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
      console.log(id);
      const query = { id: id };
      const service = await productCollection.find(query).toArray();
      res.send(service);
    });

    //* insert booking product data in db

    app.post("/booking", async (req, res) => {
      const bookingModal = req.body;
      // console.log(bookingModal)

      const result = await bookingCollection.insertOne(bookingModal);
      res.send(result);
    });

    //* Get My Order product data from db
    app.get("/bookingg", async (req, res) => {
      const email = req.query.email;
      console.log("r", email);
      const query = { email: email };

      const booking = await bookingCollection.find(query).toArray();
      res.send(booking);
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