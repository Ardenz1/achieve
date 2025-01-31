'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      router.push('/home'); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Circle in Top-Left Corner */}
      <img
        src="/icon.svg"
        alt="Logo"
        className="absolute top-8 left-6 transform -translate-x-1/2 -translate-y-1/2 md:w-[1000px] md:h-auto lg:w-[1200px] lg:h-auto z-0 pointer-events-none"
      />
      
      {/* Centered Form Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-4 sm:p-8 md:p-10">
        {/* Email Input */}
        <div className="w-full max-w-sm sm:max-w-md mb-4">
          <label className="block text-lg font-medium mb-1">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} className="w-full max-w-sm sm:max-w-md p-3 bg-achieve-grey text-white rounded-lg text-lg font-semibold hover:bg-achieve-seagreen transition">
          Login
        </button>
        {error && <p>{error}</p>}


        {/* Back Button */}
        <Link href="/welcome" className="mt-4 text-achieve-grey hover:underline text-lg text-center">
          ← Back
        </Link>
      </div>

      {/* Circle in Bottom-Right Corner */}
      <img
        src="/icon.svg"
        alt="Logo"
        className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 md:w-[800px] md:h-100 lg:w-[1000px] lg:h-100 z-0 pointer-events-none"
      />
    </div>
  );
}
