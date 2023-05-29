import React, { useContext } from "react";
import { Navigate, Outlet, useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Home.css";


const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/Login');
  };

  const handleSignUp = () => {
    navigate('/Register');
  };
  return isAuthenticated ? (
    <Navigate to="/Shop" replace />
  ) : (
    <div className="home">
    <h2 className="title">Welcome to FamiHelp!</h2>
    <div className="button-container">
      <button className="button" onClick={handleSignIn} >
        If you are child or parent:<br />
        Sign in
      </button>
      <button className="button" onClick={handleSignUp}>
        If you are parent:<br />
        Sign up
      </button>
    </div>
  </div>
  );
};

export default Home;
