import { User } from "next-auth";
import DBHelper from "../DBHelper";
import { stdout } from "process";

const UserRepo2 = () => {
  async function saveUser(user: User) {
    const db = await DBHelper().getDB();
    const userCollection = db.collection("userRep");
    try {
      console.log("Saving User To DB");
      const result = await userCollection.insertOne(user);
      console.log("Saved successfully", result);
      return result;
    } catch (e) {
      console.error("Error saving user !!", e);
    }
    console.log("exiting user repo");
  }
  return { saveUser };
};
export default UserRepo2;
