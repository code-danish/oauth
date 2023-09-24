const { MongoClient } = require("mongodb");

const DBHelper = () => {
  const uri = process.env.MONGODB_URI;
  const apiKey = "<api-key>";

  const client = new MongoClient(uri, {});
  let dbClient:any;
  async function connectToMongoDB() {
    try {
      await client.connect();
	  dbClient = await client.db(process.env.DB_NAME || "oauthDefaultDB")
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

    //lets connect to Db
	connectToMongoDB();

  function getDB() {
    return dbClient;
  }

  return { getDB };
}

export default DBHelper;