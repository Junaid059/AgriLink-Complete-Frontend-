import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Farmer');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
    setRole('Farmer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = isLogin ? "http://localhost:3000/api/auth/login" : "http://localhost:3000/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { email, password, fullName, role }; 
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (isLogin) {
          // Login success
          localStorage.setItem("role", data.role); // Assuming backend returns user role
          localStorage.setItem("accessToken", data.accessToken); // Save access token
          navigate(data.role === "admin" ? "/admin-panel" : "/");
        } else {
          // Signup success
          alert("Signup successful! Please login.");
          setIsLogin(true); // Switch to login view
        }
      } else {
        // Handle errors from the backend
        alert(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };
   // UseEffect for fetching protected data
  //  useEffect(() => {
  //   const fetchProtectedData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/auth/protectedRoute', {
  //         method: 'GET',
  //         credentials: 'include', // Ensure cookies are sent with the request
  //       });
  //       const data = await response.json();
  //       if (response.ok) {
  //         console.log("Protected data:", data);
  //       } else {
  //         alert(data.message || 'Unauthorized access.');
  //       }
  //     } catch (error) {
  //       console.error("Error accessing protected route:", error);
  //     }
  //   };

  //   fetchProtectedData();
  // }, []); // Runs only once when the component mounts (can be customized as per need)


  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-hero-pattern bg-cover bg-center">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-3xl mx-5 lg:mx-auto flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-primary bg-opacity-90 text-white">
          <h2 className="text-4xl font-bold mb-4">
            {isLogin ? 'Welcome Back' : 'Join AgriLink'}
          </h2>
          <p className="text-center mb-6">
            {isLogin
              ? 'Login to explore the best agricultural products and connect with farmers.'
              : 'Create an account to connect with top farmers and get the best deals.'}
          </p>
          <button className="flex items-center gap-3 bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-accent hover:text-green-700 transition-colors">
            <FaGoogle size={20} />
            Sign {isLogin ? 'In' : 'Up'} with Google
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 bg-white">
          <h3 className="text-3xl font-semibold text-green-600 mb-5 text-center">
            {isLogin ? 'Login to your account' : 'Create your account'}
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            
            {/* Dropdown for selecting role */}
            {!isLogin && (
            <div>
              <label htmlFor="role">Role: </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                {/* You can add more roles here if necessary */}
              </select>
            </div>
            )}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          <div className="text-center mt-8">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={handleToggle}
              className="text-green-600 font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
