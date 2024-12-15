import React, { useState } from "react"

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    })

    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const result = await response.json()
            
            if (response.ok) {
                setMessage("Login successful!");
                // Optionally redirect or store user info
                console.log("User info:", result.user);
            } else {
                setMessage(result.error || "Login failed.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error("Error:", error);
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        /> Remember Me
                    </label>
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#ffd700",
                        color: "#6A0DAD",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <a href="/forgot-password" style={{ color: "#6A0DAD", textDecoration: "none" }}>Forgot Password?</a>
                </div>
                {message && <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{message}</p>}
            </form>
        </div>
    );
};

export default Login
