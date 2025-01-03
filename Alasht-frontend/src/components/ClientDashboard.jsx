import React from "react";
import "./ClientDashboard.css"; // Include the styles for the client dashboard
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
    const navigate = useNavigate();

    const user = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Home owner",
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

    const ProjectPool = async () => {
        try {
            const response = await fetch("http://localhost:4001/projects", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setFilteredProject(data);
            } else {
                console.error("Failed to fetch projects");
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
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

// import React, { useEffect, useState } from "react";
// import "./ClientDashboard.css"; // Include the styles for the client dashboard
// import { useNavigate } from "react-router-dom";

// export default function ClientDashboard() {
//     const navigate = useNavigate();

//     const user = {
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         role: "Home owner",
//     };

//     const [filteredProject, setFilteredProject] = useState([]);

//     // Fetch projects from the server
//     const ProjectPool = async () => {
//         try {
//             const response = await fetch("http://localhost:4001/projects", {
//                 method: "GET",
//                 credentials: "include",
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setFilteredProject(data); // Update the state with fetched projects
//             } else {
//                 console.error("Failed to fetch projects");
//             }
//         } catch (error) {
//             console.error("Error fetching projects:", error);
//         }
//     };

//     // Fetch projects when the component mounts
//     useEffect(() => {
//         ProjectPool();
//     }, []);

//     const handleFilter = (status) => {
//         if (status === "All") {
//             ProjectPool(); // Refetch all projects
//         } else {
//             setFilteredProject((prevProjects) =>
//                 prevProjects.filter((client) => client.status === status)
//             );
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             const response = await fetch("http://localhost:4001/logout", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             if (response.ok) {
//                 navigate("/login");
//             } else {
//                 console.error("Logout failed");
//             }
//         } catch (error) {
//             console.error("Error during logout:", error);
//         }
//     };

//     const handleEditProfile = async () => {
//         try {
//             const response = await fetch("http://localhost:4001/client-complete-profile", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             if (response.ok) {
//                 navigate("/client-profile");
//             } else {
//                 console.error("Failed to edit profile");
//             }
//         } catch (error) {
//             console.error("Error during edit profile:", error);
//         }
//     };

//     const handlePostProject = async () => {
//         try {
//             const response = await fetch("http://localhost:4001/new-projects", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             if (response.ok) {
//                 navigate("/projects/new");
//             } else {
//                 console.error("Failed to post project");
//             }
//         } catch (error) {
//             console.error("Error during posting project:", error);
//         }
//     };

//     return (
//         <div className="client-dashboard-container">
//             {/* Left Sidebar */}
//             <aside className="client-dashboard-sidebar">
//                 <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
//                 <button onClick={handlePostProject} className="edit-profile-button">Post a new Project</button>
//                 <div className="user-info">
//                     <h2>User Information</h2>
//                     <p><strong>Name:</strong> {user.name}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Role:</strong> {user.role}</p>
//                 </div>
//                 <button onClick={handleLogout} className="logout-button">Logout</button>
//             </aside>

//             {/* Main Content */}
//             <main className="client-dashboard-main">
//                 {/* Filter Bar */}
//                 <div className="filter-bar">
//                     <button onClick={() => handleFilter("All")}>All Projects</button>
//                     <button onClick={() => handleFilter("Active")}>Active</button>
//                     <button onClick={() => handleFilter("Inactive")}>Inactive</button>
//                     <button onClick={() => handleFilter("Pending")}>Pending</button>
//                 </div>

//                 {/* Client Pool */}
//                 <div className="client-pool">
//                     <h2>Project</h2>
//                     <div className="client-list">
//                         {filteredProject.length > 0 ? (
//                             filteredProject.map((client) => (
//                                 <div key={client.id} className="client-card">
//                                     <h3>{client.name}</h3>
//                                     <p><strong>Status:</strong> {client.status}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No projects found.</p>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
