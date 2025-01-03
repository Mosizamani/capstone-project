import React, { useState } from "react"

const Signup = () => {
    const [userType, setUserType] = useState("client") // Default to client
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [messageColor, setMessageColor] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signupUser(username, password, userType, message)
    }

    const signupUser = async (username, password, userType) => {
        try {
            const response = await fetch("http://localhost:4001/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, userType, message }),
            })
    
            if (response.ok) {
                const data = await response.json();
                setMessage("User registered successfully!");
                setMessageColor("green"); // Success message in green

                setUsername("")
                setPassword("")

                

            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "Error registering user.");
                setMessageColor("red"); // Error message in red
            }
        } catch (error) {
            setMessage("Network error. Please try again later.");
            setMessageColor("red");
        }
    }

    return (
        <div style={{ maxWidth: "500px", margin: "auto", border: "1px solid #ccc", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
                <button onClick={() => setUserType("contractor")}>Join as a Pro</button>
                <button onClick={() => setUserType("client")}>Join as a Client</button>
            </div>
            <form onSubmit={handleSubmit}>
                <h2>Sign up as a {userType === "client" ? "Client" : "Contractor"}</h2>
                <div>
                    <label>Username</label>
                    <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>
                <br />
                <div>
                    <label>Password</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <br />
                {message && (
                <p style={{ color: messageColor }}>{message}</p>
                )}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup