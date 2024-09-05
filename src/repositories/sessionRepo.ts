import DBHelper from "../pages/utility/DBHelper";

export interface ISession {
  name: string;
  email: string;
  time: Date | string;
  task: string;
}

const SessionRepo = () => {
  async function saveSession(session: any) {
    const db = await DBHelper().getDB();
    const sessionDB = db.collection("sessionRep");

    try {
      const result = await sessionDB.insertOne(session);
      console.log("Session saved successfully : ", result.insertedId.toString());
      return result;
    } catch (e) {
      console.error("Error saving session !!", e);
    }
  }
  return { saveSession };
};

export default SessionRepo;
