import React, { use, useState } from "react";
import client from "../../axiosClient";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const handleRegister = async () => {
    const payload = {
      username,
      email,
      password,
      phone,
      school_id: schoolId,
    };

    try {
      const response = await client.post("/accounts", payload);
      console.log("Registration successful:", response.data);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <div className="shadow-lg">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Now!</h1>
            <p className="py-6">
              Provide credentials to get started in our library system
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">Phone</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label className="label">School ID</label>
                <input
                  type="email"
                  className="input"
                  placeholder="School ID"
                  onChange={(e) => setSchoolId(e.target.value)}
                />

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button
                  className="btn btn-neutral mt-4"
                  onClick={() => handleRegister()}
                >
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
