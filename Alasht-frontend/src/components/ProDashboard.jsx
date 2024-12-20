import React from "react"
import "./ProDashboard.css" // Ensure to style the dashboard for a polished look
import { useNavigate } from "react-router-dom"

export default function ProDashboard() {

const navigate = useNavigate()

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Project Manager",
}

const projects = [
    { id: 1, name: "Project Alpha", status: "In Progress" },
    { id: 2, name: "Project Beta", status: "Completed" },
    { id: 3, name: "Project Gamma", status: "Not Started" },
]

const [filteredProjects, setFilteredProjects] = React.useState(projects)

const handleFilter = (status) => {
    if (status === "All") {
    setFilteredProjects(projects)
    } else {
    setFilteredProjects(projects.filter((project) => project.status === status))
    }
}

const handleLogout = async () => { 

    try {
    console.log("Attempting logout...")
    const response = await fetch("http://localhost:4001/logout", { 
        method: "POST", 
        credentials: "include",
    })

    if (response.ok) {
        navigate("/login")
    } else {
        console.error("Logout failed")
    }
    } catch (error) {
    console.error("Error during logout:", error)
    }
}

return (
    <div className="dashboard-container">
    {/* Left Sidebar */}
    <aside className="dashboard-sidebar">
        <div className="user-info">
        
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
    </aside>

    {/* Main Content */}
    <main className="dashboard-main">
        {/* Filter Bar */}
        <div className="filter-bar">
        <button onClick={() => handleFilter("All")}>All Projects</button>
        <button onClick={() => handleFilter("In Progress")}>In Progress</button>
        <button onClick={() => handleFilter("Completed")}>Completed</button>
        <button onClick={() => handleFilter("Not Started")}>Not Started</button>
        </div>

        {/* Project Pool */}
        <div className="project-pool">
        <h2>Projects</h2>
        <div className="project-list">
            {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
                <h3>{project.name}</h3>
                <p><strong>Status:</strong> {project.status}</p>
            </div>
            ))}
        </div>
        </div>
    </main>
    </div>
)
}
