import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import '../styles/AuthButton.css';


const AuthButtons = () => {
    const { user, LogInWithGoogle, LogOut, createUser, Login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                await Login(email, password);
                alert("Login successful!");
            } catch (error) {
                console.error("Login failed:", error);
                alert("Login failed. Please check your credentials.");
            }
        } else {
            try {
                await createUser(email, password);
                alert("Registration successful! You can now log in.");
                setIsLogin(true);
            } catch (error) {
                console.error("Registration failed:", error);
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="auth-buttons">
            {user ? (
                <div className="user-info">
                    <button className="logout-button" onClick={LogOut}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="form-title">{isLogin ? 'Login' : 'Register'}</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="auth-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="auth-input"
                    />
                    <div className='log'>
                        <button type="submit" className="submit-button">{isLogin ? 'Login' : 'Register'}</button>
                        <button type="button" className="google-button" onClick={LogInWithGoogle}>Login with Google</button>
                    </div>
                    {isLogin ? (
                        <p className="switch-auth-message">
                            Don't have an account? <span onClick={() => setIsLogin(false)} className="link">Register</span>
                        </p>
                    ) : (
                        <p className="switch-auth-message">
                            You already have an account? <span onClick={() => setIsLogin(true)} className="link">Login</span>
                        </p>
                    )}
                </form>
            )}
        </div>
    );
};

export default AuthButtons;
