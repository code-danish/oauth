import {User } from "next-auth";
import UserRepo from "../user/userRepo";
import SessionRepo from "../session/sessionRepo";
import SessionRepo2 from "../session/sessionRepo2";
import UserRepo2 from "../user/userRepo2";


export const signInEventHandler = (user: User) =>{
	let userRepo = UserRepo();
	let sessionRepo = SessionRepo();
	let sessionRepo2= SessionRepo2();
	let userRepo2=UserRepo2();
	userRepo.saveDetails(user);
	let session = {
		email: user?.email || "N/A",
		name: user?.name || "N/A",
		time: (new Date()).toLocaleString(),
		task: "Login",
	};
	sessionRepo.saveDetails(session);
	userRepo2.saveUser(user);
	sessionRepo2.saveSession(session);
}

export const signOutHandler = ({name, email}:any) =>{
	let sessionRepo = SessionRepo();
	let sessionRepo2= SessionRepo2();
	let session = {
		email: email || "N/A",
		name: name|| "N/A",
		time: (new Date()).toLocaleString(),
		task: "LogOut"
	};
	sessionRepo.saveDetails(session);
	sessionRepo2.saveSession(session);
}

