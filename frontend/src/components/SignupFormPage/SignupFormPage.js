import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import './SignupForm.css';

function SignupFormPage({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [labelActive, setLabelActive] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Passwords must match.']);
  };

  return (
    <div className="login-modal">
      <p onClick={() => setShowModal(false)} className="cancel"></p>
      <div className="login-title">
        <p className="login-title-p">Log in or sign up</p>
      </div>
      <h1 className="login-h1">Welcome to Airbode</h1>
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <div className="login-container">
          <div onClick={() => setLabelActive([0])} className="login-divs">
            <label className={labelActive.includes(0) || email ? "login-label-three login-label-active-three" : 'login-label-three'}>
              Email
            </label>
            <input
              className="login-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div onClick={() => setLabelActive([1])} className="login-divs">
            <label className={labelActive.includes(1) || username ? "login-label-four login-label-active-four" : 'login-label-four'}>
              Username
            </label>
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div onClick={() => setLabelActive([2])} className="login-divs">
            <label className={labelActive.includes(2) || password ? "login-label-five login-label-active-five" : 'login-label-five'}>
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
          <div onClick={() => setLabelActive([3])} className="login-divs">
            <label className={labelActive.includes(3) || confirmPassword ? "login-label-six login-label-active-six" : 'login-label-six'}>
              Confirm Password
            </label>
            <input
              className="login-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="email-p">We won't email you at all. This website was made for fun and doesn't actually do anything.</p>
        <ul className="login-form-errors">
          {errors.map((error, idx) => <li className="login-form-errors-li" key={idx}>{error}</li>)}
        </ul>
        <button className="login-btn-modal" type="submit">Sign Up</button>
      </form>
      <div className="login-div">
        <p className="or">Already have an account with us?</p>
        <p className="line-thru-or"></p>
        <LoginFormModal/>
      </div>
    </div>
  );
}

export default SignupFormPage;
