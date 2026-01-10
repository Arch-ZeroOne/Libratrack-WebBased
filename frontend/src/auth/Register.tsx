import { useState } from "react";
import client from "../axiosClient";
import Swal from "sweetalert2";
import Background from "/images/background/background.png";
import Logo from "/images/icons/dorsu-logo.png";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const navigate = useNavigate();

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

      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSchoolId("");

      Swal.fire({
        title: "You are successfully registered",
        text: "Want to log in now?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/student");
        }
      });
    } catch (err) {
      console.error("Registration failed:", err);
      Swal.fire({
        title: "Registration failed",
        text: "Please try again",
        icon: "error",
      });
    }
  };
  //TODO currently changing the background overlay in register
  return (
    <div className="shadow-lg">
      <div className="hero bg-base-200 min-h-screen">
        <div className="flex   lg:flex-row shadow-lg w-220 justify-between h-120">
          {/* Background image container */}
          <div
            className="text-center flex items-center flex-col justify-center bg-cover bg-center  lg:text-left h-full w-full text-white"
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img src={Logo} alt="Logo" className="w-32 mb-4" />
            <h1 className="text-5xl font-bold text-center">Register Now!</h1>
            <p className="py-6 ">
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
                  value={username}
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label className="label">Phone</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <label className="label">School ID</label>
                <input
                  type="email"
                  className="input"
                  placeholder="School ID"
                  onChange={(e) => setSchoolId(e.target.value)}
                  value={schoolId}
                />

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleRegister()}
                >
                  Login
                </button>
                <a
                  className="text-center hover:underline underline-offset-2 text-md text-blue-600 cursor-pointer pb-4"
                  onClick={() => navigate("/")}
                >
                  Already have an account?
                </a>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
