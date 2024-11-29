import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const adminCredentials = {
      email: 'admin@gmail.com',
      password: 'admin123',
    };
    const govCredentials = {
      email: 'gov@gmail.com',
      password: 'gov123',
    };
    const userCredentials = {
      email: 'user@gmail.com',
      password: 'user123',
    };

    // Authentication logic
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      navigate('/admin-panel');
    } else if (
      email === govCredentials.email &&
      password === govCredentials.password
    ) {
      navigate('/gov-dashboard');
    } else if (
      email === userCredentials.email &&
      password === userCredentials.password
    ) {
      navigate('/');
    } else if (email && password) {
      alert('Invalid email or password. Please try again.');
    } else {
      alert('Please enter both email and password.');
    }
  };

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
