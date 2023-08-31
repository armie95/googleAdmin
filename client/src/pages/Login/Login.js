import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      return navigate("/");
    }
  },[])

  const logIn = async (event) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password
      });
      setError("");
      setToken(response.data.token);

      // Store the token in local storage or a state management solution (e.g., Redux)
      localStorage.setItem("token", response.data.token);
      if(response.data.role === "user"){
        navigate("/");
      }else{
        navigate("/admin");
      }
      

    } catch (error) {
      setError(error.response.data.message);
      // console.error("Login error:", error);
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>}
      {token && <div>Logged in!</div>}
      <input
      type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logIn}>Log In</button>
      <Link to="/signup">Don't have an account? Create one here</Link>
    </>
  );
};

export default LoginPage;
