import React, { useRef, useState } from "react";
import "./Login.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Home from "./Home";

const Login = () => {
  const userid = useRef();
  const passwordid = useRef();
  const getUserId = localStorage.getItem("uid");
  const getPassword = localStorage.getItem("password");
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    if (
      userid.current.value === "RahBaj10393" &&
      passwordid.current.value === "B9xsSVQ"
    ) {
      localStorage.setItem("uid", "RahBaj10393");
      localStorage.setItem("password", "B9xsSVQ");
    }
  };

  return (
    <div>
      {getUserId && getPassword ? (
        <Home />
      ) : (
        <div className="login-main">
          <div className="login-box">
            <h1>PHYSIOAI</h1>
            <h2>Welcome Back!</h2>

            <form onSubmit={handleSubmit}>
              <div className="user-pass">
                <label>Username</label>
                <input type="text" ref={userid} />
              </div>
              <div className="user-pass">
                <label>Password</label>
                <div className="icon-parent">
                  <input type={show ? "text" : "password"} ref={passwordid} />
                  <AiOutlineEyeInvisible
                    className="icon"
                    onClick={handleShow}
                  />
                </div>
              </div>
              <div className="login-bottom">
                <p>Forgot Passwod ?</p>
                <button>Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
