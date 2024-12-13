import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validUsername = 'user';
    const validPassword = 'password123';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Ambos campos son obligatorios');
            return;
        }

        if (formData.username === validUsername && formData.password === validPassword) {
            setError('');
            setIsAuthenticated(true); 
            navigate('/dashboard'); 
        } else {
            setError('Nombre de usuario o contraseña inválidos');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="login-container">
            <h2>Inicio de sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de usuario"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Contraseña"
                    />
                </div>
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
