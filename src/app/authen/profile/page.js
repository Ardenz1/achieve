"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) return; // Exit early if no token

      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setNewEmail(data.user.email);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchUserData();
  }, []);

  // Helper function to validate email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    // Trim and validate email
    const trimmedEmail = email.trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      setEmailErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/profile/updateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailSuccessMessage("Email updated successfully!");
        setEmailErrorMessage("");
        setUser((prevState) => ({ ...prevState, email: trimmedEmail }));
      } else {
        setEmailSuccessMessage("");
        setEmailErrorMessage(data.error || "Failed to update email.");
      }
    } catch (error) {
      setEmailSuccessMessage("");
      setEmailErrorMessage("Error updating email: " + error.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Trim input values
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();

    // Validate password length
    if (trimmedNewPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("/api/profile/updatepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: trimmedCurrentPassword, newPassword: trimmedNewPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Password updated successfully!");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage(data.error || "Something went wrong!");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error updating password: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/welcome");
  };

  return (
    <div className="relative z-10 flex flex-col bg-[url('/profilebg.png')] bg-cover bg-center items-center justify-center h-auto p-4 sm:items-center sm:p-8 sm:mb-[20%] md:mb-0 md:p-10">
      <Link href="/"><i className="absolute top-5 left-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-seagreen"></i></Link>
      <h1 className="font-bold mt-16 mb-20 text-4xl">Profile</h1>

      <div className="w-full justify-center rounded-lg p-6 sm:p-8 md:p-10 max-w-screen-lg flex flex-col md:flex-row gap-28 mb-6 ">
        {/* Email Update Form */}
        <form onSubmit={handleEmailUpdate} className="w-full max-w-sm sm:max-w-md mb-6 bg-achieve-bluepurple p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Update Profile Information</h2>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-3 placeholder-achieve-grey border border-achieve-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-40 sm:max-w-md p-3 bg-achieve-grey text-white mt-5 rounded-lg text-md font-semibold hover:bg-achieve-seagreen transition">
            Update Email
          </button>

          {emailSuccessMessage && <div className="mt-2 p-2 text-center text-achieve-white font-semibold">{emailSuccessMessage}</div>}
          {emailErrorMessage && <div className="mt-2 p-2 text-center text-achieve-white font-semibold">{emailErrorMessage}</div>}
        </form>

        {/* Password Update Form */}
        <form onSubmit={handlePasswordUpdate} className="w-full max-w-sm sm:max-w-md mb-6 bg-achieve-orange p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Update Password</h2>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 placeholder-achieve-grey border border-achieve-pink rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 placeholder-achieve-grey border border-achieve-pink rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-40 sm:max-w-md p-3 bg-achieve-grey text-white mt-5 rounded-lg text-md font-semibold hover:bg-achieve-seagreen transition">
            Update Password
          </button>

          {successMessage && <div className="mt-2 p-2 text-center text-achieve-white font-semibold">{successMessage}</div>}
          {errorMessage && <div className="mt-2 p-2 text-center text-achieve-white font-semibold">{errorMessage}</div>}
        </form>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="w-48 sm:max-w-md p-3 bg-red-500 text-white mt-5 mb-10 rounded-lg text-lg font-semibold hover:bg-achieve-darkorange transition">
        Logout
      </button>
    </div>
  );
}
