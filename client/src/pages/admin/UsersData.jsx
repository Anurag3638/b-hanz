import axios from "axios";
import React, { useState, useEffect } from "react";

export default function UsersData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/data/users") // Make sure this endpoint exists and returns an array
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {user.role === 1 ? "Admin" : "User"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
