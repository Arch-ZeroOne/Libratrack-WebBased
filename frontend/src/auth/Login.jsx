import { useState } from "react";
import client from "../../axiosClient";
import Logo from "../../assets/images/logo/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/accounts/login",
        payload
      );
      const { verified } = response.data;

      if (verified) {
        Swal.fire({
          title: "Log in success!",
          html: "You are being redirected.",
          timer: 3000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            setEmail("");
            setPassword("");
            navigate("/student");
          }
        });
      }
    } catch (err) {
      console.error("Log in failed:", err);
      Swal.fire({
        title: "Account not found",
        text: "Want to register?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/register");
        }
      });
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-100 max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <img src={Logo} className="h-full w-25 mr-auto ml-auto"></img>
            <fieldset className="fieldset flex flex-col ">
              <label className="label font-bold">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label font-bold">Password</label>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={() => handleLogIn()}
              >
                Login
              </button>
              <a
                className="text-center hover:underline underline-offset-2 text-md text-blue-600 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Dont have an account?
              </a>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
