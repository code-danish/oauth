import DBHelper from "../DBHelper";

const SessionRepo2 = () => {
	async function saveSession(session:any){
		const db = DBHelper().getDB();
		const sessionDB = db.collection('sessionRep');
		console.log('saving session to repo');
		try{
			const result = await sessionDB.insertOne(session);
			return result;
		}
		catch(e){
			console.log('Something went wrong, saving session !!!',e);
		}
		
	}
	return {saveSession};	
}

export default SessionRepo2;