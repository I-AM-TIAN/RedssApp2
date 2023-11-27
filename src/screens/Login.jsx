import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/login.css'; // Importa el archivo de estilos CSS

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = () => {
        navigate('/Admin', { state: { username, password } });
    };

    return (

        <div className="login-container">
            <form className="login-form">
                <h2 className="login-header">Login</h2>
                <label htmlFor="usernameInput" className="form-label">
                    Usuario:
                    <input
                        type="text"
                        id="usernameInput"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="passwordInput" className="form-label">
                    Contraseña:
                    <input
                        type="password"
                        id="passwordInput"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="button" className="login-button" onClick={handleLogin}>
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};
