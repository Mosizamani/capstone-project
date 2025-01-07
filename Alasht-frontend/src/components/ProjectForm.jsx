import React, { useState } from 'react'
import ServiceInput from './ServiceInput'
import { useNavigate } from 'react-router-dom'

const ProjectForm = () => {
const [formData, setFormData] = useState({
    name: '',
    service:'',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'Under Review',
    contractor: '',
    location: '',
    country: 'USA',
    state: '',
    city: '',
    zip: '',
    
})

const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Project Manager",
}

const [services, setServices] = useState([{ id: Date.now(), value: "" }]);
const [message, setMessage] = useState("")

const addServiceInput = () => {
    setServices([...services, { id: Date.now(), value: "" }]);
};

const removeServiceInput = (id) => {
    setServices(services.filter((service) => service.id !== id));
};

const handleServiceChange = (id, value) => {
    setMessage(value === "NeedService" ? "No worries, we will teach you the essential services!" : "");
    setServices(services.map((service) => (service.id === id ? { ...service, value } : service)));
}

const updateServiceOptions = () => {
    const selectedServices = new Set(services.map((service) => service.value.toLowerCase()).filter((val) => val));
    return selectedServices
}

const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    // onSubmit({ ...formData, services })

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    data.services = services.map(service => service.value).filter(value => value.trim() !== "")

    alert("Form Submitted!")

    console.log(data)

    await fetchProject(data)
}

async function fetchProject(data) {
    try {
        const response = await fetch('http://localhost:4001/projects', {
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

const navigate = useNavigate()

const handleBack = async () => {
    try {
        const response = await fetch('http://localhost:4001/client-complete-profile', {
            method: 'POST',
            credentials: 'include',
        })

        if (!response.ok) {
            console.error('Failed to complete profile')
        }
    } catch (error) {
        console.error('Error completing profile:', error)
    } finally {
        navigate('/client-dashboard')
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
            <div>
                <label>Project Name:</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Select a service required:</label>

                {services.map((service, index) => (
                    <ServiceInput
                        key={service.id}
                        service={service}
                        name="services"
                        index={index}
                        onServiceChange={handleServiceChange}
                        onRemoveService={removeServiceInput}
                        addServiceInput={addServiceInput}
                        selectedServices={updateServiceOptions()}
                    />
                    ))}
                <div id="message-container" style={{ color: "green", marginTop: "10px" }}>
                    {message}
                </div>    
            </div>
            <div>
                <label>Description:</label>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Budget:</label>
                <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Status:</label>
                <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                >
                <option value="Under Review">Under Review</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            {/* <div>
                <label>Contractor ID:</label>
                <input
                type="text"
                name="contractor"
                value={formData.contractor}
                onChange={handleChange}
                />
                <p>If you have the contractors ID please write it down.</p>
            </div> */}
            <div>
                <label>Location:</label>
                <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>State:</label>
                <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>City:</label>
                <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>ZIP Code:</label>
                <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                minLength={5}
                maxLength={5}
                pattern="\d{5}" // Optional, to ensure it's numeric
                title="Please enter exactly 5 digits."
                />
            </div>
            <button type="submit">Submit Project</button>
            </form>
        </main>
    </div>
)
}

export default ProjectForm
