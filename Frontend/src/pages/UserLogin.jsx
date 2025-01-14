import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <img
        className="w-16"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-xl mb-2 block font-medium">
            What's your email
          </label>
          <input
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            type="email"
            name="email"
            placeholder="email@example.com"
            id="email"
            autoComplete="username"
          />
          <label htmlFor="password" className="block text-xl mb-2 font-medium">
            Enter Password
          </label>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            required
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
            id="password"
            autoComplete="current-password"
          />
          <button
            className="bg-[#111111] text-white mb-3 rounded px-4 py-2 w-full text-lg "
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-600">
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/captain-login"
        className="bg-[#10b461] flex items-center justify-center text-white mb-5 rounded px-4 py-2 w-full text-lg "
      >
        Sign in as Captain
      </Link>
    </div>
  );
};

export default UserLogin;
