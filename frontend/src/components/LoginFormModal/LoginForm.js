import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './login.css'
import SignupFormModal from "../SignupFormPage/SignupFormModal";

function LoginForm({ setShowModalLogin }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [labelActive, setLabelActive] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-modal">
      <div className="login-title">
        <p onClick={() => setShowModalLogin(false)} className="cancel"></p>
        <p className="login-title-p">Log in or sign up</p>
      </div>
      <h1 className="login-h1">Welcome to Airbode</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-container">
          <div onClick={() => setLabelActive([0])} className="login-divs">
            <label className={labelActive.includes(0) || credential ? "login-label-one login-label-active-one" : 'login-label-one'}>
              Username or Email
            </label>
            <input
              className="login-input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div onClick={() => setLabelActive([1])} className="login-divs">
            <label className={labelActive.includes(1) || password ? "login-label-two login-label-active-two" : 'login-label-two'}>
              Password
            </label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="email-p">We won't email you at all. This website was made for fun and doesn't actually do anything.</p>
        <ul className="login-form-errors">
          {errors.length ? errors.map((error, idx) => (
            <li className="login-form-errors-li" key={idx}>{error}</li>
          )) : null}
        </ul>
        <button className="login-btn-modal" type="submit">Log In</button>
      </form>
      <div>
        <p className="or">or</p>
        <p className="line-thru-or"></p>
        <div className="below-btns-div">
          <div>
            <SignupFormModal setShowModalLogin={setShowModalLogin}/>
          </div>
          <button className="below-btns" type="button"><a className="below-btns-links" href="https://github.com/jay-bean">GitHub</a></button>
          <button className="below-btns" type="button"><a className="below-btns-links" href="https://www.linkedin.com/in/jay-hutts-300ab9180/">LinkedIn</a></button>
          <button className="below-btns" type="button"><a className="below-btns-links" href="https://www.jayhutts.dev/">Personal Site</a></button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
