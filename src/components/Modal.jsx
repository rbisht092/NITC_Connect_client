import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import axios from "axios";

const Modal = ({ onClose, setIsLoggedin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [isRegistering, setIsRegistering] = useState(false); // Define the state here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const response = await axios.post("auth/signup", {
          username: formData.username,
          displayname: formData.fullName,
          mail: formData.email,
          password: formData.password,
          image: formData.image,
        });
        if (response.status === 201) {
          alert("Registration successful! Please log in.");
          setIsRegistering(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        mail: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("displayname", response.data.user.displayname);
        localStorage.setItem("user_id", response.data.user._id);
        localStorage.setItem("profile_url", response.data.user.image);
        console.log(response);
        alert("Login successful!");
        setIsLoggedin(true);
        onClose();
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-32 h-32 mb-4 rounded" />
          {isRegistering ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-blue-400">Register</h2>
              <form onSubmit={handleSubmit}>
                {/* Registration Form */}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Add URL to your picture (optional)"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                >
                  Register
                </button>
              </form>
              <p className="mt-4 text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-400 hover:underline"
                >
                  Login here
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4 text-blue-400">Login</h2>
              <form onSubmit={handleLogin}>
                {/* Login Form */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-gray-300">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-400 hover:underline"
                >
                  Register now
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
