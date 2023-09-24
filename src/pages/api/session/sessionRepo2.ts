import DBHelper from "../DBHelper";

const SessionRepo2 = () => {
	async function saveSession(session:any){
		const db = DBHelper().getDB();
		const sessionDB = db.collection('sessionRep');
		const result = await sessionDB.insertOne(session);
		return result;
	}
	return {saveSession};	
}

export default SessionRepo2;