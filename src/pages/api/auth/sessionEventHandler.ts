import { User } from "next-auth";
import SessionRepo2 from "../session/sessionRepo2";
import UserRepo2 from "../user/userRepo2";

export const signInEventHandler = (user: User) => {
  try {
    console.log("inside sign in handler");
    // let userRepo = UserRepo();
    // let sessionRepo = SessionRepo();
    let sessionRepo2 = SessionRepo2();
    let userRepo2 = UserRepo2();
    // userRepo.saveDetails(user);
    let session = {
      email: user?.email || "N/A",
      name: user?.name || "N/A",
      time: new Date().toLocaleString(),
      task: "Login",
    };
    // sessionRepo.saveDetails(session);
    console.log("executed the usual");
    console.log("calling 2.0");
    userRepo2.saveUser(user);
    sessionRepo2.saveSession(session);
    console.log("executed 2.0");
  } catch (e) {
    console.error("Error in sign in handler", e);
  }
};

export const signOutHandler = ({ name, email }: any) => {
  try {
    console.log("Inside signout handler");
    // let sessionRepo = SessionRepo();
    let sessionRepo2 = SessionRepo2();
    let session = {
      email: email || "N/A",
      name: name || "N/A",
      time: new Date().toLocaleString(),
      task: "LogOut",
    };
    // sessionRepo.saveDetails(session);
    sessionRepo2.saveSession(session);
  } catch (e) {
    console.error("Error in signout handler", e);
  }
};
