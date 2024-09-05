import { User } from "next-auth";
import SessionRepo from "../utility/repositories/sessionRepo";
import UserRepo from "../utility/repositories/userRepo";

export const signInEventHandler = (user: User) => {
  try {
    let sessionRepo = SessionRepo();
    let userRepo = UserRepo();
    let session = {
      email: user?.email || "N/A",
      name: user?.name || "N/A",
      time: new Date().toLocaleString(),
      task: "Login",
    };
    console.log("Saving user details", user);
    userRepo.saveUser(user);
    sessionRepo.saveSession(session);
  } catch (e) {
    console.error("Error in sign in handler", e);
  }
};

export const signOutHandler = ({ name, email }: any) => {
  try {
    let sessionRepo = SessionRepo();
    let session = {
      email: email || "N/A",
      name: name || "N/A",
      time: new Date().toLocaleString(),
      task: "LogOut",
    };
    sessionRepo.saveSession(session);
  } catch (e) {
    console.error("Error in signout handler", e);
  }
};
