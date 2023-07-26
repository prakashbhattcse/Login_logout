import { React, useState } from 'react'
import "./register.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    // State to store user input data
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    // Function to handle input changes and update the state accordingly
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the state with the new input value based on the input field's name
        setUser({
            ...user,
            [name]: value
        });
    };

    // Function to register the user when the "Register" button is clicked
    const register = () => {
        const { name, email, password, reEnterPassword } = user;

        // Validate user input: All fields must be filled, and passwords must match
        if (name && email && password && (password === reEnterPassword)) {
            // Make a POST request to the server to register the user
            axios.post("http://localhost:3000/register", user)
                .then(res => {
                    // Show the response message from the server after successful registration
                    alert(res.data.message);
                    // Optionally, redirect the user to the login page after successful registration
                    navigate("/")
                })
                .catch(error => {
                    // Handle errors, if any, during the registration process
                    console.log(error);
                    alert("Registration failed. Please try again later.");
                });
        } else {
            // Show an alert if the user input is invalid or incomplete
            alert("Invalid input. Please fill all fields and ensure the passwords match.");
        }
    };

    return (
        <div className="register">
        
            {console.log(user)}
            <h1>Register</h1>
        
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Your Name" />
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Your Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Your Password" />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} placeholder="Re-enter Password" />
            {/* Register button triggers the register function when clicked */}
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
    )
}

export default Register
