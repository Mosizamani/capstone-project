import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ClientProfile({ initialData = {} }) {
    const [formData, setFormData] = useState({
        firstname: initialData.firstname || "",
        lastname: initialData.lastname || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        // projects: initialData.projects || [],
        // contractors: initialData.contractors || [],
        country: initialData.country || "USA",
        state: initialData.state || "",
        city: initialData.city || "",
        address: initialData.address || "",
        zip: initialData.zip || "",
    })

    const user = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Project Manager",
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const [error, setError] = useState('')
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4001/edit-profile', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            })
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred.')
            } else {
                const result = await response.json();
                console.log('Profile updated successfully:', result)
                setError('')
            }
        } catch (error) {
            console.error('Error making API request:', error)
            setError('Failed to connect to the server.')
        }
    }

    const navigate = useNavigate()

    const handleBack = async () => {
        try {
            const response = await fetch('http://localhost:4001/complete-profile', {
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
                <form onSubmit={handleFormSubmit} className="client-form">
                    <div>
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="zip">ZIP Code:</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="projects">Projects:</label>
                        <input
                            type="text"
                            id="projects"
                            name="projects"
                            value={formData.projects.join(", ")}
                            onChange={(e) =>
                                setFormData({ ...formData, projects: e.target.value.split(", ") })
                            }
                        />
                        <small>Enter project IDs separated by commas</small>
                    </div>
                    <div>
                        <label htmlFor="contractors">Contractors:</label>
                        <input
                            type="text"
                            id="contractors"
                            name="contractors"
                            value={formData.contractors.join(", ")}
                            onChange={(e) =>
                                setFormData({ ...formData, contractors: e.target.value.split(", ") })
                            }
                        />
                        <small>Enter contractor IDs separated by commas</small>
                    </div> */}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>

    )
}