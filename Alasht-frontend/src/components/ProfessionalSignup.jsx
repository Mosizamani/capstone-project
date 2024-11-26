
import React, { useState } from "react"
import SkillInput from "./SkillInput"

export default function ProfessionalSignup () {
const [skills, setSkills] = useState([{ id: Date.now(), value: "" }]);
const [message, setMessage] = useState("");

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
    return selectedSkills;
};

const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted!");
};

return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required minLength={4} />
        <br />
        <br />

        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname" required />
        <br />
        <br />

        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required />
        <br />
        <br />

        <label htmlFor="company">Company:</label>
        <input type="text" id="company" name="company" required />
        <br />
        <br />

        <label htmlFor="skills">Skills:</label>
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

        <label htmlFor="payment">Payment:</label>
        <input type="text" id="payment" name="payment" defaultValue="By contract" required />
        <br />
        <br />

        {/* Remaining fields */}
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <br />

        <label htmlFor="country">Country (default: USA):</label>
        <select id="country" name="country" required defaultValue="USA">
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
        </select>
        <br />
        <br />

        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
)
}


