import React, { useState, useEffect } from "react";
import ProjectList from "../components/ProjectList";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Redirect to Login if User is not logged
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div className="container">
      {!loading ? (
        <ProjectList></ProjectList>
      ) : (
        <span className="spinner-border spinner-border-sm"></span>
      )}
    </div>
  );
};
export default Home;
