import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MediaApp from "../MediaCard/mediaCard";


function Dashboard() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(true);
  const [mediaCard, setMediaCard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }
    axios
      .get("http://localhost:8080/api/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMediaCard(response.data.mediaCard)
     
        setUser(response.data.userData);
        if(response.data.userData.role === "user"){
          setFailedAuth(false);
        }
      })
      .catch((error) => {
        console.log(error);
        
        setFailedAuth(true);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (user === null) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <p>
        Welcome back, {user.first_name} {user.last_name}
      </p>

      <h2>My Profile</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <p>Role: {user.role}</p>
      <br/>
      <p>Data from Firebase for user only</p>
<div style={{display:"flex",justifyContent:"space-evenly"}}>
      {mediaCard.length > 0 ? mediaCard.map((item)=>{
        return <MediaApp name={item.name} company={item.company} img={item.img} price={item.price}/>
      }):null}

</div>

      <button className="dashboard__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}

export default Dashboard;
