import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './login.css'

function LoginForm({ setShowModal, signupBtn }) {
  const dispatch = useDispatch();

  // is signup is true then display signup form, else display login form
  const [signup, setSignup] = useState(signupBtn ? true : false);

  // login info
  const [credential, setCredential] = useState("");

  // signup info
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // shared info
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [labelActive, setLabelActive] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleSignup = (e) => {
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
    <>
      {!signup ?
        <div className="login-modal">
          <div className="login-title">
            <p onClick={() => setShowModal(false)} className="cancel"></p>
            <p className="login-title-p">Log in or sign up</p>
          </div>
          <h1 className="login-h1">Welcome to Airbode</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-container">
              <div onClick={() => setLabelActive([0])} className="login-divs-trial">
                <div className='label-div-trial'><label className={labelActive.includes(0) || credential ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Username or Email</label></div>
                <input
                  className="login-input-trial"
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </div>
              <div onClick={() => setLabelActive([1])} className="login-divs-trial last">
                <div className='label-div-trial'><label className={labelActive.includes(1) || password ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Password</label></div>
                <input
                  className="login-input-trial"
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
              {/* <SignupFormModal setShowModalSignup={setShowModalSignup}/> */}
              <button className="below-btns" type="button" onClick={() => setSignup(true)}>Sign Up</button>
              <button className="below-btns" type="button"><a className="below-btns-links" href="https://github.com/jay-bean">GitHub</a></button>
              <button className="below-btns" type="button"><a className="below-btns-links" href="https://www.linkedin.com/in/jay-hutts-300ab9180/">LinkedIn</a></button>
              <button className="below-btns" type="button"><a className="below-btns-links" href="https://www.jayhutts.dev/">Personal Site</a></button>
            </div>
          </div>
        </div>

      :

        <div className="login-modal">
          <div className="login-title">
            <p onClick={() => setShowModal(false)} className="cancel"></p>
            <p className="login-title-p">Log in or sign up</p>
          </div>
          <h1 className="login-h1">Welcome to Airbode</h1>
          <form
            className="login-form"
            onSubmit={handleSignup}
          >
            <div className="signup-container">
              <div onClick={() => setLabelActive([0])} className="signup-divs-trial">
                <div className='label-div-trial'><label className={labelActive.includes(0) || email ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Email</label></div>
                <input
                  className="login-input-trial"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div onClick={() => setLabelActive([1])} className="signup-divs-trial last">
                <div className='label-div-trial'><label className={labelActive.includes(1) || username ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Username</label></div>
                <input
                  className="login-input-trial"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div onClick={() => setLabelActive([2])} className="signup-divs-trial last">
                <div className='label-div-trial'><label className={labelActive.includes(2) || password ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Password</label></div>
                <input
                  className="login-input-trial"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div onClick={() => setLabelActive([3])} className="signup-divs-trial last">
                <div className='label-div-trial'><label className={labelActive.includes(3) || confirmPassword ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Confirm Password</label></div>
                <input
                  className="login-input-trial"
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
            <button className="below-btns login-instead" type="button" onClick={() => setSignup(false)}>Log In</button>
            {/* <LoginFormModal/> */}
          </div>
        </div>
      }


    </>
  );
}

export default LoginForm;
