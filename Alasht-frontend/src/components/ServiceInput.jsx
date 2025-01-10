import React from "react";

const ServiceInput = ({
service,
index,
onServiceChange,
onRemoveService,
addServiceInput,
selectedServices,
}) => {
const serviceOptions = [
    "NeedService",
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

const handleServiceSelect = (event) => {
    const { value } = event.target;
    onServiceChange(service.id, value)
}

return (
    <div className="service-input">
    <select
        name="services"
        value={service.value}
        onChange={handleServiceSelect}
        required
    >
        <option value="" disabled>
        Select a service
        </option>
        {serviceOptions.map((option) => (
        <option
            key={option}
            value={option}
            disabled={
            selectedServices.has(option.toLowerCase()) &&
            option.toLowerCase() !== service.value.toLowerCase()
            }
        >
            {option}
        </option>
        ))}
    </select>
    <button type="button" onClick={addServiceInput} disabled={!service.value}>
        +
    </button>
    {index > 0 && (
        <button type="button" onClick={() => onRemoveService(service.id)}>
        -
        </button>
    )}
    </div>
)
}

export default ServiceInput
