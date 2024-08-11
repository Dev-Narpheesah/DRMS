import React, { useState, useEffect } from 'react';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
    const [userCount, setUserCount] = useState(100);
    const [overviewData, setOverviewData] = useState({
        status: "Active",
        affectedAreas: 12,
        reliefCenters: 5
    });
    const [tasks, setTasks] = useState([
        "Task 1: Distribute food supplies",
        "Task 2: Coordinate with local authorities",
        "Task 3: Manage volunteer schedules"
    ]);
    const [messages, setMessages] = useState([
        { from: "John Doe", message: "Need more volunteers at the relief center." },
        { from: "Jane Smith", message: "Food supplies are running low." }
    ]);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://via.placeholder.com/150"
    });

    useEffect(() => {
        // Simulate data fetching delay
        const timer = setTimeout(() => {
            // All data is mocked, no need to fetch
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Disaster Relief Management System</h1>
                <nav>
                    <ul>
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#tasks">Tasks</a></li>
                        <li><a href="#messages">Messages</a></li>
                        <li><a href="#settings">Settings</a></li>
                    </ul>
                </nav>
            </header>

            <main className={styles.main}>
                <section id="overview">
                    <h2>Overview</h2>
                    <p>Status: {overviewData.status}</p>
                    <p>Affected Areas: {overviewData.affectedAreas}</p>
                    <p>Relief Centers: {overviewData.reliefCenters}</p>
                </section>

                <section id="tasks">
                    <h2>Tasks</h2>
                    <ul>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => <li key={index}>{task}</li>)
                        ) : (
                            <p>No tasks available</p>
                        )}
                    </ul>
                </section>

                <section id="messages">
                    <h2>Messages</h2>
                    <ul>
                        {messages.length > 0 ? (
                            messages.map((message, index) => (
                                <li key={index}>
                                    <strong>{message.from}</strong>: {message.message}
                                </li>
                            ))
                        ) : (
                            <p>No messages available</p>
                        )}
                    </ul>
                </section>

                <section id="settings">
                    <h2>Settings</h2>
                    <img src={profile.image} alt="User" className={styles.profileImage} />
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <button onClick={() => alert('Logged out!')}>Logout</button>
                </section>

                <section id="user-count">
                    <h2>Total Users: {userCount}</h2>
                </section>

                <section className={styles.logoContainer}>
                    <img src="wave.jpeg" alt="SLDA Logo" />
                </section>

                <button className={styles.emergencyButton}>Emergency | SOS</button>

                <div className={styles.serviceIcons}>
                    <div className={styles.serviceIcon}>
                        <img src="fire.jpeg" alt="Rescue" />
                    </div>
                    <div className={styles.serviceIcon}>
                        <img src="police.jpeg" alt="Police" />
                    </div>
                    <div className={styles.serviceIcon}>
                        <img src="hospital.jpeg" alt="Hospital" />
                    </div>
                    <div className={styles.serviceIcon}>
                        <img src="scout.jpeg" alt="Firefighter" />
                    </div>
                    <div className={styles.serviceIcon}>
                        <img src="Aid.jpeg" alt="Disaster Aid" />
                    </div>
                </div>

                <div className={styles.informationSections}>
                    <h2>Safety Tips</h2>
                    <p>Learn how to stay safe during a disaster...</p>
                    <h2>Evacuation</h2>
                    <p>Find the nearest evacuation routes...</p>
                    <h2>Latest News</h2>
                    <div className={styles.newsItem}>
                        <p>News headline 1...</p>
                    </div>
                    <div className={styles.newsItem}>
                        <p>News headline 2...</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;


// import React, { useState, useEffect } from 'react';  

// import axios from 'axios';
// import styles from './UserDashboard.module.css';

// const UserDashboard = () => {
//     const [userCount, setUserCount] = useState(0);
//     const [overviewData, setOverviewData] = useState({});
//     const [tasks, setTasks] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [profile, setProfile] = useState({ name: '', email: '', image: '' });

//     useEffect(() => {
//         fetchUserCount();
//         fetchOverviewData();
//         fetchTasks();
//         fetchMessages();
//         fetchProfile();
//     }, []);

//     const fetchUserCount = async () => {
//         try {
//             const res = await axios.get('/api/data/user-count');
//             setUserCount(res.data.userCount);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchOverviewData = () => {
//         setOverviewData({
//             status: 'Active',
//             affectedAreas: 10,
//             reliefCenters: 5,
//         });
//     };

//     const fetchTasks = () => {
//         setTasks([
//             'Coordinate with local authorities',
//             'Distribute relief materials',
//             'Monitor affected areas',
//         ]);
//     };

//     const fetchMessages = () => {
//         setMessages([
//             { from: 'Coordinator', message: 'Meeting at 10 AM' },
//             { from: 'Volunteer', message: 'Need more supplies in area 3' },
//         ]);
//     };

//     const fetchProfile = () => {
//         setProfile({ name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/150' });
//     };

//     const handleLogout = () => {
//         alert('Logged out!');
//     };

//     return (
//         <div className={styles.dashboard}>
//             <header className={styles.header}>
//                 <h1>Disaster Relief Management System</h1>
//                 <nav>
//                     <ul>
//                         <li><a href="#overview">Overview</a></li>
//                         <li><a href="#tasks">Tasks</a></li>
//                         <li><a href="#messages">Messages</a></li>
//                         <li><a href="#settings">Settings</a></li>
//                     </ul>
//                 </nav>
//             </header>
//             <main className={styles.main}>
//                 <section id="overview">
//                     <h2>Overview</h2>
//                     <p>Status: {overviewData.status}</p>
//                     <p>Affected Areas: {overviewData.affectedAreas}</p>
//                     <p>Relief Centers: {overviewData.reliefCenters}</p>
//                 </section>
//                 <section id="tasks">
//                     <h2>Tasks</h2>
//                     <ul>
//                         {tasks.map((task, index) => (
//                             <li key={index}>{task}</li>
//                         ))}
//                     </ul>
//                 </section>
//                 <section id="messages">
//                     <h2>Messages</h2>
//                     <ul>
//                         {messages.map((message, index) => (
//                             <li key={index}>
//                                 <strong>{message.from}</strong>: {message.message}
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//                 <section id="settings">
//                     <h2>Settings</h2>
//                     <img src={profile.image} alt="User" className={styles.profileImage} />
//                     <p>Name: {profile.name}</p>
//                     <p>Email: {profile.email}</p>
//                     <button onClick={handleLogout}>Logout</button>
//                 </section>
//                 <section id="user-count">
//                     <h2>Total Users: {userCount}</h2>
//                 </section>
//                 <section className={styles.logoContainer}>
//                     <img src="wave.jpeg" alt="SLDA Logo" />
//                 </section>
//                 <button className={styles.emergencyButton}>Emergency | SOS</button>
//                 <div className={styles.serviceIcons}>
//                     <div className={styles.serviceIcon}>
//                         <img src="fire.jpeg" alt="Rescue" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="police.jpeg" alt="Police" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="hospital.jpeg" alt="Hospital" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="scout.jpeg" alt="Firefighter" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="Aid.jpeg" alt="Disaster Aid" />
//                     </div>
//                 </div>
//                 <div className={styles.informationSections}>
//                     <h2>Safety Tips</h2>
//                     <p>Learn how to stay safe during a disaster...</p>
//                     <h2>Evacuation</h2>
//                     <p>Find the nearest evacuation routes...</p>
//                     <h2>Latest News</h2>
//                     <div className={styles.newsItem}>
//                         <p>News headline 1...</p>
//                     </div>
//                     <div className={styles.newsItem}>
//                         <p>News headline 2...</p>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default UserDashboard;




// import React,{ useState, useEffect } from 'react';
// import styles from './UserDashboard.module.css';

// const UserDashboard = () => {
//   const [userCount, setUserCount] = useState(0);

//   useEffect(() => {
//       const fetchUserCount = async () => {
//           try {
//               const res = await axios.get('/api/data/user-count');
//               setUserCount(res.data.userCount);
//           } catch (error) {
//               console.error(error);
//           }
//       };

//       fetchUserCount();
//   }, []);


//   return (
//     <div className={styles.dashboardContainer}>
//           <div>
//             <h2>Total Users: {userCount}</h2>
//         </div>
//       <div className={styles.logoContainer}>
//         <img src="wave.jpeg" alt="SLDA Logo" />
//       </div>
//       <button className={styles.emergencyButton}>Emergency | SOS</button>
//       <div className={styles.serviceIcons}>
//         <div className={styles.serviceIcon}>
//           <img src="fire.jpeg" alt="Rescue" />
//         </div>
//         <div className={styles.serviceIcon}>
//           <img src="police.jpeg" alt="Police" />
//         </div>
//         <div className={styles.serviceIcon}>
//           <img src="hospital.jpeg" alt="Hospital" />
//         </div>
//         <div className={styles.serviceIcon}>
//           <img src="scout.jpeg" alt="Firefighter" />
//         </div>
//         <div className={styles.serviceIcon}>
//           <img src="Aid.jpeg" alt="Disaster Aid" />
//         </div>
//       </div>
//       <div className={styles.informationSections}>
//         <h2>Safety Tips</h2>
//         <p>Learn how to stay safe during a disaster...</p>
//         <h2>Evacuation</h2>
//         <p>Find the nearest evacuation routes...</p>
//         <h2>Latest News</h2>
//         <div className={styles.newsItem}>
//           <p>News headline 1...</p>
//         </div>
//         <div className={styles.newsItem}>
//           <p>News headline 2...</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;







// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import UpdateProfile from './UpdateProfile';
// import './UserDashboard.css';

// const UserDashboard = () => {
//   const [overviewData, setOverviewData] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [profile, setProfile] = useState({ name: '', email: '', image: '' });

//   useEffect(() => {
//     // Simulate fetching data from an API
//     fetchOverviewData();
//     fetchTasks();
//     fetchMessages();
//     fetchProfile();
//   }, []);

//   const fetchOverviewData = () => {
//     // Simulated API call
//     setOverviewData({
//       status: 'Active',
//       affectedAreas: 10,
//       reliefCenters: 5,
//     });
//   };

//   const fetchTasks = () => {
//     // Simulated API call
//     setTasks([
//       'Coordinate with local authorities',
//       'Distribute relief materials',
//       'Monitor affected areas',
//     ]);
//   };

//   const fetchMessages = () => {
//     // Simulated API call
//     setMessages([
//       { from: 'Coordinator', message: 'Meeting at 10 AM' },
//       { from: 'Volunteer', message: 'Need more supplies in area 3' },
//     ]);
//   };

//   const fetchProfile = () => {
//     // Simulated API call
//     setProfile({ name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/150' });
//   };

//   const handleLogout = () => {
//     alert('Logged out!');
//   };

//   return (
//     <Router>
//       <div className="dashboard">
//         <header className="dashboard-header">
//           <h1>Disaster Relief Management System</h1>
//           <nav>
//             <ul>
//               <li><a href="#overview">Overview</a></li>
//               <li><a href="#tasks">Tasks</a></li>
//               <li><a href="#messages">Messages</a></li>
//               <li><a href="#settings">Settings</a></li>
//             </ul>
//           </nav>
//         </header>
//         <main className="dashboard-main">
//           <Switch>
//             <Route exact path="/">
//               <section id="overview">
//                 <h2>Overview</h2>
//                 <p>Status: {overviewData.status}</p>
//                 <p>Affected Areas: {overviewData.affectedAreas}</p>
//                 <p>Relief Centers: {overviewData.reliefCenters}</p>
//               </section>
//               <section id="tasks">
//                 <h2>Tasks</h2>
//                 <ul>
//                   {tasks.map((task, index) => (
//                     <li key={index}>{task}</li>
//                   ))}
//                 </ul>
//               </section>
//               <section id="messages">
//                 <h2>Messages</h2>
//                 <ul>
//                   {messages.map((message, index) => (
//                     <li key={index}>
//                       <strong>{message.from}</strong>: {message.message}
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//               <section id="settings">
//                 <h2>Settings</h2>
//                 <img src={profile.image} alt="User" className="profile-image"/>
//                 <p>Name: {profile.name}</p>
//                 <p>Email: {profile.email}</p>
//                 <Link to="/update-profile">
//                   <button>Update Profile</button>
//                 </Link>
//                 <button onClick={handleLogout}>Logout</button>
//               </section>
//             </Route>
//             <Route path="/update-profile">
//               <UpdateProfile profile={profile} setProfile={setProfile} />
//             </Route>
//           </Switch>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default UserDashboard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import {useHistory } from 'react-router-dom';
// import styles from './UserDashboard.module.css';

// const UserDashboard = () => {
//     const [userCount, setUserCount] = useState(0);
//     const [overviewData, setOverviewData] = useState({});
//     const [tasks, setTasks] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [profile, setProfile] = useState({ name: '', email: '', image: '' });
//     // const history = useHistory();

//     useEffect(() => {
//         fetchUserCount();
//         fetchOverviewData();
//         fetchTasks();
//         fetchMessages();
//         fetchProfile();
//     }, []);

//     const fetchUserCount = async () => {
//         try {
//             const res = await axios.get('/api/data/user-count');
//             setUserCount(res.data.userCount);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchOverviewData = async () => {
//         try {
//             const res = await axios.get('/api/user/overview');
//             setOverviewData(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchTasks = async () => {
//         try {
//             const res = await axios.get('/api/user/tasks');
//             setTasks(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchMessages = async () => {
//         try {
//             const res = await axios.get('/api/user/messages');
//             setMessages(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchProfile = async () => {
//         try {
//             const res = await axios.get('/api/user/profile');
//             setProfile(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleLogout = () => {
//         // Clear the authentication token from localStorage
//         localStorage.removeItem('authToken');

//         // Redirect to login page or home page
//         history.push('/login');
//     };

//     return (
//         <div className={styles.dashboard}>
//             <header className={styles.header}>
//                 <h1>Disaster Relief Management System</h1>
//                 <nav>
//                     <ul>
//                         <li><a href="#overview">Overview</a></li>
//                         <li><a href="#tasks">Tasks</a></li>
//                         <li><a href="#messages">Messages</a></li>
//                         <li><a href="#settings">Settings</a></li>
//                     </ul>
//                 </nav>
//             </header>
//             <main className={styles.main}>
//                 <section id="overview">
//                     <h2>Overview</h2>
//                     <p>Status: {overviewData.status}</p>
//                     <p>Affected Areas: {overviewData.affectedAreas}</p>
//                     <p>Relief Centers: {overviewData.reliefCenters}</p>
//                 </section>
//                 <section id="tasks">
//                     <h2>Tasks</h2>
//                     <ul>
//                         {tasks.map((task, index) => (
//                             <li key={index}>{task}</li>
//                         ))}
//                     </ul>
//                 </section>
//                 <section id="messages">
//                     <h2>Messages</h2>
//                     <ul>
//                         {messages.map((message, index) => (
//                             <li key={index}>
//                                 <strong>{message.from}</strong>: {message.message}
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//                 <section id="settings">
//                     <h2>Settings</h2>
//                     <img src={profile.image} alt="User" className={styles.profileImage} />
//                     <p>Name: {profile.name}</p>
//                     <p>Email: {profile.email}</p>
//                     <button onClick={handleLogout}>Logout</button>
//                 </section>
//                 <section id="user-count">
//                     <h2>Total Users: {userCount}</h2>
//                 </section>
//                 <section className={styles.logoContainer}>
//                     <img src="wave.jpeg" alt="SLDA Logo" />
//                 </section>
//                 <button className={styles.emergencyButton}>Emergency | SOS</button>
//                 <div className={styles.serviceIcons}>
//                     <div className={styles.serviceIcon}>
//                         <img src="fire.jpeg" alt="Rescue" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="police.jpeg" alt="Police" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="hospital.jpeg" alt="Hospital" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="scout.jpeg" alt="Firefighter" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="Aid.jpeg" alt="Disaster Aid" />
//                     </div>
//                 </div>
//                 <div className={styles.informationSections}>
//                     <h2>Safety Tips</h2>
//                     <p>Learn how to stay safe during a disaster...</p>
//                     <h2>Evacuation</h2>
//                     <p>Find the nearest evacuation routes...</p>
//                     <h2>Latest News</h2>
//                     <div className={styles.newsItem}>
//                         <p>News headline 1...</p>
//                     </div>
//                     <div className={styles.newsItem}>
//                         <p>News headline 2...</p>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default UserDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { useHistory } from 'react-router-dom';
// import styles from './UserDashboard.module.css';

// const UserDashboard = () => {
//     const [userCount, setUserCount] = useState(0);
//     const [overviewData, setOverviewData] = useState({});
//     const [tasks, setTasks] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [profile, setProfile] = useState({ name: '', email: '', image: '' });
//     // const history = useHistory();

//     useEffect(() => {
//         fetchUserCount();
//         fetchOverviewData();
//         fetchTasks();
//         fetchMessages();
//         fetchProfile();
//     }, []);

//     const fetchUserCount = async () => {
//         try {
//             const res = await axios.get('/api/data/user-count');
//             setUserCount(res.data.userCount);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchOverviewData = async () => {
//         try {
//             const res = await axios.get('/api/user/overview');
//             setOverviewData(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchTasks = async () => {
//         try {
//             const res = await axios.get('/api/user/tasks');
//             setTasks(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchMessages = async () => {
//         try {
//             const res = await axios.get('/api/user/messages');
//             setMessages(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchProfile = async () => {
//         try {
//             const res = await axios.get('/api/user/profile');
//             setProfile(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     // const handleLogout = () => {
//     //     localStorage.removeItem('authToken');
//     //     history.push('/login');
//     // };

//     return (
//         <div className={styles.dashboard}>
//             <header className={styles.header}>
//                 <h1>Disaster Relief Management System</h1>
//                 <nav>
//                     <ul>
//                         <li><a href="#overview">Overview</a></li>
//                         <li><a href="#tasks">Tasks</a></li>
//                         <li><a href="#messages">Messages</a></li>
//                         <li><a href="#settings">Settings</a></li>
//                     </ul>
//                 </nav>
//             </header>
//             <main className={styles.main}>
//                 <section id="overview">
//                     <h2>Overview</h2>
//                     <p>Status: {overviewData.status}</p>
//                     <p>Affected Areas: {overviewData.affectedAreas}</p>
//                     <p>Relief Centers: {overviewData.reliefCenters}</p>
//                 </section>
//                 <section id="tasks">
//                     <h2>Tasks</h2>
//                     <ul>
//                         {tasks.map((task, index) => (
//                             <li key={index}>{task}</li>
//                         ))}
//                     </ul>
//                 </section>
//                 <section id="messages">
//                     <h2>Messages</h2>
//                     <ul>
//                         {messages.map((message, index) => (
//                             <li key={index}>
//                                 <strong>{message.from}</strong>: {message.message}
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//                 <section id="settings">
//                     <h2>Settings</h2>
//                     <img src={profile.image} alt="User" className={styles.profileImage} />
//                     <p>Name: {profile.name}</p>
//                     <p>Email: {profile.email}</p>
//                     <button >Logout</button>
//                 </section>
//                 <section id="user-count">
//                     <h2>Total Users: {userCount}</h2>
//                 </section>
//                 <section className={styles.logoContainer}>
//                     <img src="wave.jpeg" alt="SLDA Logo" />
//                 </section>
//                 <button className={styles.emergencyButton}>Emergency | SOS</button>
//                 <div className={styles.serviceIcons}>
//                     <div className={styles.serviceIcon}>
//                         <img src="fire.jpeg" alt="Rescue" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="police.jpeg" alt="Police" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="hospital.jpeg" alt="Hospital" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="scout.jpeg" alt="Firefighter" />
//                     </div>
//                     <div className={styles.serviceIcon}>
//                         <img src="Aid.jpeg" alt="Disaster Aid" />
//                     </div>
//                 </div>
//                 <div className={styles.informationSections}>
//                     <h2>Safety Tips</h2>
//                     <p>Learn how to stay safe during a disaster...</p>
//                     <h2>Evacuation</h2>
//                     <p>Find the nearest evacuation routes...</p>
//                     <h2>Latest News</h2>
//                     <div className={styles.newsItem}>
//                         <p>News headline 1...</p>
//                     </div>
//                     <div className={styles.newsItem}>
//                         <p>News headline 2...</p>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default UserDashboard;