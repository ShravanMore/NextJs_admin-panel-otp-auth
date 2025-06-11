/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !id) {
      router.push("/admin/login");
      return;
    }

    axios
      .get(`https://eazrdaily.eazr.in/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        console.error("User fetch failed", err);
        router.push("/admin/login");
      });
  }, [id, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Contact:</strong> {user.phoneNumber}</p>
      <p><strong>DOB:</strong> {user.dob}</p>
    </div>
  );
}


