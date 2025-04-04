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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    // Trim and format input
    const formattedEmail = email.trim().toLowerCase();
    const formattedPassword = password.trim(); // Trim but keep case sensitivity

    // Validate email and password
    if (!formattedEmail || !formattedPassword) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(formattedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(formattedPassword)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError(''); // Clear previous errors

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formattedEmail, password: formattedPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSuccessMessage('Account created successfully! Redirecting to login page.');
      setTimeout(() => {
        setSuccessMessage('');
        router.push('/authen/login');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <img
        src="/iconNew.svg"
        alt="Logo"
        className="absolute top-8 left-6 transform -translate-x-1/2 -translate-y-1/2 md:w-[900px] md:h-auto lg:w-[900px] lg:h-auto z-0 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-4 sm:p-8 md:p-10">
        <h1 className="text-center font-bold mb-4 text-4xl">Create Account</h1>

        {/* Email Input */}
        <div className="w-full max-w-sm sm:max-w-md mb-4">
          <label className="block text-lg font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} // Format on input
            className="w-full p-3 placeholder-achieve-grey border border-achieve-bluepurple rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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


        {/* Password Input */}
        <div className="w-full max-w-sm sm:max-w-md mb-6">
          <label className="block text-lg font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())} // Trim spaces
            className="w-full p-3 placeholder-achieve-grey border border-achieve-pink  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Account Button */}
        <button
          onClick={handleSignup}
          className="w-full max-w-sm sm:max-w-md p-3 bg-achieve-grey text-white rounded-lg text-lg font-semibold hover:bg-achieve-green hover:text-achieve-grey transition"
        >
          Create Account
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <div className="text-achieve-green p-4 text-center font-semibold">
            {successMessage}
          </div>
        )}

        {/* Back Button */}
        <Link href="/welcome" className="mt-4 text-achieve-grey hover:underline text-lg text-center">
          ← Back
        </Link>
      </div>
      <img
        src="/iconNew.svg"
        alt="Logo"
        className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 md:w-[600px] md:h-100 lg:w-[900px] lg:h-100 z-0 pointer-events-none"
      />
    </div>
  );
}
