'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    // Validate email and password
    if (!email || !password) {
      setError('Please enter both email and password.');
      return; // Stop the function execution if validation fails
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If the response is not OK, display the error message
        throw new Error(data.error || 'Signup failed');
      }

      // Show success message and redirect to login
      setSuccessMessage('Account created successfully! You can now log in.');
      setTimeout(() => {
        setSuccessMessage(''); // Clear success message after 5 seconds
        router.push('/authen/login'); // Redirect to login page
      }, 5000);
    } catch (err) {
      setError(err.message); // Set the error message to display
    }
  };

  return (
    <div>
       {/* Success Message */}
       {successMessage && (
        <div className="fixed top-0 left-0 right-0 bg-achieve-green text-white p-4 text-center font-semibold z-50">
          {successMessage}
        </div>
      )}
      {/* Centered Form Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-4 sm:p-8 md:p-10">
        <h1 className="text-center font-bold mb-4 text-4xl">Create Account</h1>

        {/* Gender Dropdown
        <div className="w-full max-w-sm sm:max-w-md mb-4">
          <label className="block text-lg text-achieve-grey font-medium mb-1">Gender</label>
          <select
            className="w-full p-3 placeholder-achieve-grey border-2  border-achieve-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled >Select your gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

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

        {/* Email Input */}
        <div className="w-full max-w-sm sm:max-w-md mb-4">
          <label className="block text-lg font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 placeholder-achieve-grey border bg-achieve-purple border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> 

        {/* Password Input */}
        <div className="w-full max-w-sm sm:max-w-md mb-6">
          <label className="block text-lg font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 placeholder-achieve-grey border bg-achieve-pink border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Account Button */}
        <button onClick={handleSignup} className="w-full max-w-sm sm:max-w-md p-3 bg-achieve-grey text-white rounded-lg text-lg font-semibold hover:bg-achieve-seagreen transition">
          Create Account
        </button>
        {error && <p>{error}</p>}

        {/* Back Button */}
        <Link href="/welcome" className="mt-4 text-achieve-grey hover:underline text-lg text-center">
          ← Back
        </Link>
      </div>
    </div>
  );
}
