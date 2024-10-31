import React, { useState } from "react";
import { assets } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { apiSignup } from "./services/auth";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData(event.target)
      const firstName = formData.get("firstName")
      const lastName = formData.get("lastName")
      const email = formData.get("email")
      const password = formData.get("password")
      const confirmPassword = formData.get("confirmPassword")

      console.log(firstName,lastName,email,password,confirmPassword);

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!")
        return
      }
      const payload = {firstName:firstName, lastName:lastName, email:email, password:password}
      const response = await apiSignup (payload)
      console.log(response.data)
      toast.success("Sign up Successful")
      navigate("/login")

    }catch (error) {
        toast.error("Signup failed. Please try again.")

        console.log(error)

      } finally {
          setLoading(false)
        
      }
    
  
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Sign Up to Ghana Hazard Reporter
          </h1>
          <h1 className="text-sm">
            In a world where environmental challenges and economic
            sustainability go hand in hand
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-[#E6FCF9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-700 hover:underline"
                title="Login"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src={assets.signUpImg}
            alt="Sign Up Image"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
