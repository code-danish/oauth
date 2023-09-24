import { User } from "next-auth";
import DBHelper from "../DBHelper";

const UserRepo2 = ()=>{
	async function saveUser(user:User){
		const db = DBHelper().getDB();
		const userCollection = db.collection('userRep');
		const result = await userCollection.insertOne(user);
		return result;
	}
	return{saveUser};
}
export default UserRepo2;