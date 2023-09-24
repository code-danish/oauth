import submitSession from "@/pages/utility/submitSession";
import submitUser from "@/pages/utility/submitUser";
import { Session, User } from "next-auth"
import UserRepo from "../user/userRepo";
import SessionRepo from "../session/sessionRepo";

export const signInEventHandler = (user: User) =>{
	let userRepo = UserRepo();
	let sessionRepo = SessionRepo();
	console.log('saving user details');
	sessionRepo.testConnection();
	// userRepo.saveDetails(user);
	submitUser(user);
	sessionRepo.saveDetails({
		email: user?.email || "N/A",
		name: user?.name || "N/A",
		time: (new Date()).toLocaleString(),
		task: "Login",
	});
}

export const signOutHandler = ({name, email}:any) =>{
	let sessionRepo = SessionRepo();
	sessionRepo.testConnection();
	sessionRepo.saveDetails({
		email: email || "N/A",
		name: name|| "N/A",
		time: (new Date()).toLocaleString(),
		task: "LogOut"
	});
}