
import React, { useState } from "react"
import SkillInput from "./SkillInput"

export default function ProfessionalSignup () {
const [skills, setSkills] = useState([{ id: Date.now(), value: "" }]);
const [message, setMessage] = useState("")

const addSkillInput = () => {
    setSkills([...skills, { id: Date.now(), value: "" }]);
};

const removeSkillInput = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
};

const handleSkillChange = (id, value) => {
    setMessage(value === "NeedSkill" ? "No worries, we will teach you the essential skills!" : "");
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, value } : skill)));
};

const updateSkillOptions = () => {
    const selectedSkills = new Set(skills.map((skill) => skill.value.toLowerCase()).filter((val) => val));
    return selectedSkills
}

const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    data.skills = skills.map(skill => skill.value).filter(value => value.trim() !== "")

    console.log("Submit function triggered!")
    console.log("Skills:", skills)
    console.log("Submitted data:", data)

    alert("Form Submitted!")

    await fetchProfessional(data)
}

async function fetchProfessional(data) {
    try {
        const response = await fetch("http://localhost:4001/contractors", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            withCredentials: true
        })

        if (response.ok) {
            alert("Form submitted successfully!");
        } else {
            alert("Failed to submit form.");
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred during submission.");
    }
}



return (
    <div className="client-dashboard-container">
    {/* Left Sidebar */}
    <aside className="client-dashboard-sidebar">
    <button onClick={handleBack} className="edit-profile-button"> Return to Dashboard</button>
        <div className="user-info">
            <h2>User Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    </aside>
    {/* Main Content */}
    <main className="client-dashboard-main">
        {/* Edit Profile */}
            <form onSubmit={handleSubmit}>
                <h2>Complete your Profile</h2>
                <label htmlFor="firstname">First Name: </label>
                <input 
                type="text" 
                id="firstname" 
                name="firstname" 
                required />
                <br />
                <br />

                <label htmlFor="lastname">Last Name: </label>
                <input 
                type="text" 
                id="lastname" 
                name="lastname" 
                required />
                <br />
                <br />

                <label htmlFor="company">Company: </label>
                <input 
                type="text" 
                id="company" 
                name="company" 
                required />
                <br />
                <br />

                <label htmlFor="skills">Skills: </label>
                <div id="skills-container">
                    {skills.map((skill, index) => (
                    <SkillInput
                        key={skill.id}
                        skill={skill}
                        index={index}
                        onSkillChange={handleSkillChange}
                        onRemoveSkill={removeSkillInput}
                        addSkillInput={addSkillInput}
                        selectedSkills={updateSkillOptions()}
                    />
                    ))}
                </div>
                <div id="message-container" style={{ color: "green", marginTop: "10px" }}>
                    {message}
                </div>
                <br />

                <label htmlFor="payment">Payment: </label>
                <input type="text" id="payment" name="payment" defaultValue="By contract" required />
                <br />
                <br />

                {/* Remaining fields */}
                <label htmlFor="phone">Phone Number: </label>
                <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required />
                <br />
                <br />

                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" required />
                <br />
                <br />

                <label htmlFor="country">Country: </label>
                <select id="country" name="country" required defaultValue="USA">
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                </select>
                <br />
                <br />

                <label htmlFor="zip">Zip code: </label>
                <input 
                type="zip" 
                id="zip" 
                name="zip"
                required
                minLength={5}
                maxLength={5}
                pattern="\d{5}" // Optional, to ensure it's numeric
                title="Please enter exactly 5 digits."
                />
                <br />
                <br />

                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
)
}