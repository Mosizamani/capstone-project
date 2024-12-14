import React from "react";

const SkillInput = ({
skill,
index,
onSkillChange,
onRemoveSkill,
addSkillInput,
selectedSkills,
}) => {
const skillOptions = [
    "NeedSkill",
    "Carpentry",
    "Drywall",
    "Flooring",
    "Tiling",
    "Windows",
    "Doors",
    "Cabinetry",
    "Countertops",
    "Appliances",
    "Lighting",
    "Electrical",
    "Plumbing",
    "Painting",
    "Masonry",
    "Landscaping",
    "Roofing",
    "HVAC",
    "Other",
]

const handleSkillSelect = (event) => {
    const { value } = event.target;
    onSkillChange(skill.id, value);
};

return (
    <div className="skill-input">
    <select
        name="skills"
        value={skill.value}
        onChange={handleSkillSelect}
        required
    >
        <option value="" disabled>
        Select a skill
        </option>
        {skillOptions.map((option) => (
        <option
            key={option}
            value={option}
            disabled={
            selectedSkills.has(option.toLowerCase()) &&
            option.toLowerCase() !== skill.value.toLowerCase()
            }
        >
            {option}
        </option>
        ))}
    </select>
    <button type="button" onClick={addSkillInput} disabled={!skill.value}>
        +
    </button>
    {index > 0 && (
        <button type="button" onClick={() => onRemoveSkill(skill.id)}>
        -
        </button>
    )}
    </div>
);
};

export default SkillInput
