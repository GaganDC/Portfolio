// test.js
const { MongoClient } = require("mongodb")
require("dotenv").config() // Load .env variables

const uri = process.env.MONGODB_URI

async function testConnection() {
  try {
    const client = new MongoClient(uri, {
      ssl: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await client.connect()
    console.log("✅ Connected to MongoDB!")

    const db = client.db("portfolio")
    const profile = await db.collection("profile").findOne({})
    console.log("Sample profile:", profile)

    await client.close()
  } catch (err) {
    console.error("❌ Connection failed:", err.message)
  }
}

testConnection()
