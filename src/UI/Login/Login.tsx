import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { signIn } from "../../BLL/signIn/signInThunk";
import { IAppStore } from "../../BLL/store/store";
import { FORGOT_PATH, REGISTER_PATH } from "../Routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const isLoggedIn = useSelector<IAppStore, boolean>(
    (state) => state.signIn.isLoggedIn
  );
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(signIn({ email, password, rememberMe }));
  };

  if (isLoggedIn) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div>
      <h2>It-incubator</h2>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <div>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
        </div>
        <div>
          <label>Remember me</label>
          <div>
            <input
              type="checkbox"
              name="rememberMe"
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
            />
          </div>
        </div>
        <div>
          <NavLink to={FORGOT_PATH}>Forgot password</NavLink>
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <div>Don't have an account?</div>
      <div>
        <NavLink to={REGISTER_PATH}>Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;
