import React, { useState } from "react"

const SingleFormSignup = () => {
    const [userType, setUserType] = useState("client") // Default to client

    const handleUserTypeChange = (type) => {
        setUserType(type)
    }

    return (
        <div style={{ maxWidth: "500px", margin: "auto", border: "1px solid #ccc", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
                <button onClick={() => handleUserTypeChange("contractor")}>Join as a Pro</button>
                <button onClick={() => handleUserTypeChange("client")}>Join as a Client</button>
            </div>
            <form>
                <h2>Sign up as a {userType === "client" ? "Client" : "Contractor"}</h2>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SingleFormSignup
