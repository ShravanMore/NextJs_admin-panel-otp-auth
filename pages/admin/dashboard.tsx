/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Dashboard() {
    interface User {
    id: number;
    name: string;
    email: string;
    [key: string]: any; // optional fallback
    }
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");         
    const cachedUsers = localStorage.getItem("users");  {/*fetching data from local storage to avoid repeated api requests*/}

    if (!token) {
      router.push("/admin/login");
      return;
    }

    if (cachedUsers) {
      const parsed = JSON.parse(cachedUsers);
      setUsers(parsed);
      setFilteredUsers(parsed);
      setLoading(false); 
      return;
    }

    axios
      .get("https://eazrdaily.eazr.in/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const fetchedUsers = res.data.data;
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
        localStorage.setItem("users", JSON.stringify(fetchedUsers));
      })
      .catch((err) => {
        console.error("Unauthorized or error", err);
        router.push("/admin/login");
      })
      .finally(() => setLoading(false)); 
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    setUsers([]);
    setFilteredUsers([]);
    router.push("/admin/login");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (!keyword) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name?.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Admin Dashboard</h1>
        {/*Extra : I have added Logout button which will clear the tokens and data from local storage and redirect user to login page again*/}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/*Extra : I have added a search feature also*/}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {loading ? (
        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Fetching user details...
        </p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => router.push(`/admin/users/${user.id}`)}
              style={{ cursor: "pointer", margin: "0.5rem 0" }}
            >
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


























// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// export default function Dashboard() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const cachedUsers = localStorage.getItem("users");

//     if (!token) {
//       router.push("/admin/login");
//       return;
//     }

//     if (cachedUsers) {
//       const parsed = JSON.parse(cachedUsers);
//       setUsers(parsed);
//       setFilteredUsers(parsed);
//       return;
//     }

//     axios
//       .get("https://eazrdaily.eazr.in/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const fetchedUsers = res.data.data;
//         setUsers(fetchedUsers);
//         setFilteredUsers(fetchedUsers);
//         localStorage.setItem("users", JSON.stringify(fetchedUsers));
//       })
//       .catch((err) => {
//         console.error("Unauthorized or error", err);
//         router.push("/admin/login");
//       });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("users");
//     setUsers([]);
//     setFilteredUsers([]);
//     router.push("/admin/login");
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const keyword = e.target.value;
//   setSearchTerm(keyword);

//   if (!keyword) {
//     setFilteredUsers(users);
//   } else {
//     const filtered = users.filter((user) =>
//       user.name?.toLowerCase().includes(keyword.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }
// };

//   return (
//     <div className="container">
//       <div className="top-bar">
//         <h1>Admin Dashboard</h1>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </div>

//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={handleSearch}
//         className="search-input"
//       />

//       <ul>
//         {filteredUsers.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => router.push(`/admin/users/${user.id}`)}
//             style={{ cursor: "pointer", margin: "0.5rem 0" }}
//           >
//             {user.name} ({user.email})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

















