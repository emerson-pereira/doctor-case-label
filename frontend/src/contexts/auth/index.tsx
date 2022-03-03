import React from 'react';
import User from './interfaces/user.interface';
import Auth from './interfaces/auth.interface';

const AuthContext = React.createContext<Auth>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialUser: User = {
    name: '',
    email: '',
    token: ''
  };

  const [user, setUser] = React.useState<User>(initialUser);

  const signin = (newUser: User, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(initialUser);
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
