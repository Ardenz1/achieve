"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
  
      if (!token) {
        console.warn("No token found.");
        return; // Exit early instead of redirecting
      }
  
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Response Status:", response.status);
  
        const data = await response.json();
        console.log("Response Data:", data);
  
        if (!response.ok) {
          console.error("Error from API:", data.error);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/welcome");
  };
  
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("/api/profile/updatepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  


  return (
<div className="relative z-10 flex flex-col items-center justify-center h-auto p-4 sm:p-8 sm:mb-[20%] md:mb-20 md:p-10">
<h1 className="font-bold mt-16 mb-20 text-4xl">Profile</h1>

    <div className="w-full  rounded-lg p-6 sm:p-8 md:p-10 max-w-screen-lg flex flex-col md:flex-row gap-28 mb-6">
    {/* Email Update Form */}
    {/* onSubmit={handleEmailUpdate} */}
    <form  className="w-full max-w-sm sm:max-w-md mb-6 bg-achieve-bluepurple p-6 rounded-lg">
      <h2 className="text-2xl mb-4">Update Email</h2>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Email</label>
        <input
          type="email"
          value={user?.email || ""}
          onChange={(e) => setNewEmail(e.target.value)} // Manage email state with setNewEmail
          className="w-full p-3 placeholder-achieve-grey border  border-achieve-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" className="w-80 sm:max-w-md p-3 bg-achieve-grey text-white mt-5 rounded-lg text-lg font-semibold hover:bg-achieve-seagreen transition">
        Update Email
      </button>
    </form>

    {/* Password Update Form */}
    {/* onSubmit={handlePasswordUpdate} */}
    <form onSubmit={handlePasswordUpdate} className="w-full max-w-sm sm:max-w-md mb-6 bg-achieve-orange p-6 rounded-lg">
      <h2 className="text-2xl mb-4">Update Password</h2>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)} // Manage current password state
          className="w-full p-3 placeholder-achieve-grey border border-achieve-pink rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // Manage new password state
          className="w-full p-3 placeholder-achieve-grey border  border-achieve-pink rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" className="w-80 sm:max-w-md p-3 bg-achieve-grey text-white mt-5 rounded-lg text-lg font-semibold hover:bg-achieve-seagreen transition ">
        Update Password
      </button>
    </form>
    </div>

    {/* Other Profile Details - Commented Out */}

    {/* Gender Dropdown */}
    {/* <div className="w-full max-w-sm sm:max-w-md mb-4">
      <label className="block text-lg text-achieve-grey font-medium mb-1">Gender</label>
      <select
        className="w-full p-3 placeholder-achieve-grey border-2 border-achieve-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select your gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
    </div> */}

    {/* Height Input (Feet and Inches) */}
    {/* <div className="w-full max-w-sm sm:max-w-md mb-6 flex space-x-4">
      <div className="flex-1">
        <label className="block text-lg font-medium mb-1">Feet</label>
        <input
          type="number"
          placeholder="Feet"
          className="w-full p-3 placeholder-achieve-grey border bg-achieve-orange border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-lg font-medium mb-1">Inches</label>
        <input
          type="number"
          placeholder="Inches"
          className="w-full p-3 placeholder-achieve-grey border bg-achieve-orange border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div> */}

    {/* Weight Input */}
    {/* <div className="w-full max-w-sm sm:max-w-md mb-4">
      <label className="block text-lg font-medium mb-1">Weight (lb)</label>
      <input
        type="number"
        placeholder="Enter your weight"
        className="w-full p-3 placeholder-achieve-grey border bg-achieve-seagreen border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div> */}

    {/* Weight Goal Input */}
    {/* <div className="w-full max-w-sm sm:max-w-md mb-6">
      <label className="block text-lg font-medium mb-1">Weight Goal (lb)</label>
      <input
        type="number"
        placeholder="Enter your goal weight"
        className="w-full p-3 placeholder-achieve-grey border bg-achieve-bluepurple border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div> */}

    {/* Logout Button */}
    <button onClick={handleLogout} className="w-80 sm:max-w-md p-3 bg-red-500 text-white mt-5 rounded-lg text-lg font-semibold hover:bg-achieve-seagreen transition">
      Logout
    </button>

    {/* Back Button */}
    <Link href="/" className="mt-4 text-achieve-grey hover:underline text-lg text-center">
      ← Back
    </Link>
  </div>
   
  );
}
