import { User } from "next-auth";
import DBHelper from "../DBHelper";

const UserRepo2 = ()=>{
	const db = DBHelper().getDB();
	const userCollection = db.collection('userRep');
	async function saveUser(user:User){
		console.log('saving user to DB');
		try{
			const result = await userCollection.insertOne(user);
		return result;
		}
		catch(e){
			console.log('Something went wrong, while saving user !!', e);
		}
	}
	return{saveUser};
}
export default UserRepo2;