import User from "./user.interface";

interface Auth {
  user: User;
  signin: (user: User, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export default Auth;
