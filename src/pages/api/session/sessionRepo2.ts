import DBHelper from "../DBHelper";

const SessionRepo2 = () => {
  async function saveSession(session: any) {
    const db = await DBHelper().getDB();
    const sessionDB = db.collection("sessionRep");

    try {
      console.log("Saving Session", session.email, session.task);
      const result = await sessionDB.insertOne(session);
      console.log("Saved Successfully : ", result);
      return result;
    } catch (e) {
      console.error("Error saving session !!", e);
    }
  }
  return { saveSession };
};

export default SessionRepo2;
