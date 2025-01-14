import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      // Handle nested fullName state updates
      setFormData((prevState) => ({
        ...prevState,
        fullName: {
          ...prevState.fullName,
          [name]: value, // Update the specific firstName or lastName
        },
      }));
    } else {
      // Handle non-nested state updates (email, password)
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <label htmlFor="firstName" className="text-xl mb-2 block font-medium">
            What's your name?
          </label>
          <div className="flex gap-4 w-full mb-7">
            <input
              required
              value={formData.fullName.firstName}
              onChange={handleChange}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              type="text"
              name="firstName"
              placeholder="First Name"
              id="firstName"
            />
            <input
              required
              value={formData.fullName.lastName}
              onChange={handleChange}
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base"
              type="text"
              name="lastName"
              placeholder="Last Name"
              id="lastName"
            />
          </div>

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
            Create Account
          </button>
          <p className="text-center">
            Already have a Account?{" "}
            <Link to="/login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/captain-signup"
        className="bg-[#10b461] flex items-center justify-center text-white mb-5 rounded px-4 py-2 w-full text-lg "
      >
        Signup as Captain
      </Link>
    </div>
  );
};

export default UserRegister;
