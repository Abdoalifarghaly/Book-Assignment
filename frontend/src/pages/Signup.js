import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axiosConfig"


const Signup=()=>{
    const [form,setform]=useState({
        name:"",
        email:"",
        password:""
    })
    const[message,setmessage]=useState("")
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})

    }
    const handelsubmit= async (e)=>{
e.preventDefault();
try {
    await api.post("/auth/signup",form)
    setmessage("Registered successfully! Redirecting to login...")
    setTimeout(() => {
        navigate("/login")
    }, 1500);
} catch (err) {
     setmessage("❌ " + (err.response?.data?.error || "Something went wrong"));
}
    }
    return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow p-4 border-0">
          <h3 className="mb-3 text-center text-primary fw-bold">
            Create an Account
          </h3>

          <form onSubmit={handelsubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>

          {message && (
            <div className="alert alert-info text-center mt-3">{message}</div>
          )}
        </div>
      </div>
    </div>
  </div>
);

}
export default Signup;