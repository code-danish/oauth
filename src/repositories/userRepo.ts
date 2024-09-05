import { User } from "next-auth";
import DBHelper from "../pages/utility/DBHelper";

const UserRepo = () => {
  async function saveUser(user: User) {
    const db = await DBHelper().getDB();
    const userCollection = db.collection("userRep");
    try {
      const result = await userCollection.insertOne(user);
      console.log("User saved successfully", result.insertedId.toString());
      return result;
    } catch (e) {
      console.error("Error saving user !!", e);
    }
  }
  return { saveUser };
};
export default UserRepo;
