const { MongoClient } = require("mongodb");

const DBHelper = () => {
  const uri = process.env.MONGODB_URI;
  const apiKey = "<api-key>";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  async function connectToMongoDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  function getDB() {
    return client.db(process.env.DB_NAME || "oauthDefaultDB");
  }
  //lets connect to Db
  connectToMongoDB();
  return { getDB };
}

export default DBHelper;