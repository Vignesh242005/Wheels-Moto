import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Ensure your CSS styles are imported

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost/car_service_centre/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Important to send session cookies
            });
    
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data.success) {
                // Successfully logged in
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');
    
                // Redirect based on admin status
                if (data.isAdmin) {
                    navigate('/AdminDashboard');
                } else {
                    navigate('/appointment-form');
                }
            } else {
                // Handle login error
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };
    

    return (
        <div className="login-container">
            <h3>Login</h3>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>

            <div className="signup-redirect">
                <p><center>Don't have an account?</center></p>
                <Link to="/signup" className="btn btn-success">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;
