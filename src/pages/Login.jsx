import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextInstance";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Ingresá un email válido");
            return;
        }

        login();
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                {error && <p style={styles.error}>{error}</p>}

                <button type="submit" style={styles.button}>
                    Ingresar
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "400px",
        margin: "60px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "8px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    input: {
        padding: "8px",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#222",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "14px",
    },
};

export default Login;