import React, { useState } from 'react'
import PropTypes from 'prop-types';

const ProjectForm = ({ onSubmit }) => {
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

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
}

const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    alert("Form Submitted!")
    console.log(formData)
}

return (
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
        <input
        type="text"
        name="service"
        value={formData.service}
        onChange={handleChange}
        required
        />
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
    <div>
        <label>Contractor ID:</label>
        <input
        type="text"
        name="contractor"
        value={formData.contractor}
        onChange={handleChange}
        required
        />
        <p>If you have the contractors ID please write it down.</p>
    </div>
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
        />
    </div>
    <button type="submit">Submit Project</button>
    </form>
)
}

export default ProjectForm
