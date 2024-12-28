import React from "react";
import "./ClientDashboard.css"; // Include the styles for the client dashboard
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
    const navigate = useNavigate();

    const user = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Project Manager",
    }

    const Project = [
        { id: 1, name: "Project Alpha", status: "Active" },
        { id: 2, name: "Project Beta", status: "Inactive" },
        { id: 3, name: "Project Gamma", status: "Pending" },
    ];

    const [filteredProject, setFilteredProject] = React.useState(Project);

    const handleFilter = (status) => {
        if (status === "All") {
            setFilteredProject(Project);
        } else {
            setFilteredProject(Project.filter((client) => client.status === status));
        }
    };

    const handleLogout = async () => {
        try {
            console.log("Attempting logout...");
            const response = await fetch("http://localhost:4001/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const handleEditProfile = async () => {

        try {
        const response = await fetch("http://localhost:4001/client-complete-profile", { 
            method: "POST", 
            credentials: "include",
        })

        if (response.ok) {
            navigate("/client-profile")
        } else {
            console.error("")
        }
        } catch (error) {
        console.error("Error during :", error)
        }
    }

    const handlePostProject = async () => {
        try {
            const response = await fetch("http://localhost:4001/new-projects", { 
                method: "POST", 
                credentials: "include",
            })
    
            if (response.ok) {
                navigate("/projects/new")
            } else {
                console.error("")
            }
            } catch (error) {
            console.error("Error during :", error)
            }
    }

    return (
        <div className="client-dashboard-container">
            {/* Left Sidebar */}
            <aside className="client-dashboard-sidebar">
                <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
                <button onClick={handlePostProject} className="edit-profile-button">Post a new Project</button>
                <div className="user-info">
                    <h2>User Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </aside>

            {/* Main Content */}
            <main className="client-dashboard-main">
                {/* Filter Bar */}
                <div className="filter-bar">
                    <button onClick={() => handleFilter("All")}>All Project</button>
                    <button onClick={() => handleFilter("Active")}>Active</button>
                    <button onClick={() => handleFilter("Inactive")}>Inactive</button>
                    <button onClick={() => handleFilter("Pending")}>Pending</button>
                </div>

                {/* Client Pool */}
                <div className="client-pool">
                    <h2>Project</h2>
                    <div className="client-list">
                        {filteredProject.map((client) => (
                            <div key={client.id} className="client-card">
                                <h3>{client.name}</h3>
                                <p><strong>Status:</strong> {client.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}