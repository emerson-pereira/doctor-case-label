import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import MainSection from './components/MainSection';
import TopBar from './components/TopBar';

interface AuthContextType {
  user: UserOrNull;
  signin: (user: UserOrNull, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

interface User {
  name: string;
  email: string;
  token: string;
}

type UserOrNull = User | null;

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <TopBar />

        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <MainSection />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserOrNull>(null);

  const signin = (newUser: UserOrNull, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
