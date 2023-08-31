import "./Signup.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input";

function Signup () {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [Message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8080/api/users/register", {
                email: event.target.email.value,
                password: event.target.password.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                phone: event.target.phone.value,
                address: event.target.address.value,
            },{
                headers: {
                  "Content-Type": "application/json"
                }
              })
            .then((res) => {

                setSuccess(true);
                setError("");
                // event.target.reset();
                setMessage(res.data.message)
                console.log(res.data)
            })
            .catch((error) => {
                
                setSuccess(false);
                setError(error.response.data);
                setMessage(error.response.data.message);
            });
    };

    return (
        <main className="signup-page">
            <form className="signup" onSubmit={handleSubmit}>
                <h1 className="signup__title">Sign up</h1>

                <Input type="text" name="first_name" label="First name" />
                <Input type="text" name="last_name" label="Last name" />
                <Input type="text" name="phone" label="Phone" />
                <Input type="text" name="address" label="Address" />
                <Input type="text" name="email" label="Email" />
                <Input type="password" name="password" label="Password" />

                <button className="signup__button">Sign up</button>

                {<div className="signup__message" style={{backgroundColor:success?"green":"red"}}>{Message}</div>}
                {/* {!success && <div className="signup__message" style={{backgroundColor:"red"}}>{Message}</div>} */}
            </form>
            <p>
                Have an account? <Link to="/login">Log in</Link>
            </p>
        </main>
    );
}

export default Signup;
