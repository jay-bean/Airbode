import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './login.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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
    <div className='modal'>
      <div className='modal-2'>
        <div className='modal-3'>
          <div className="login-modal">
            <p className="cancel">X</p>
            <div className="login-title">
            <p className="login">Log in or sign up</p>
            </div>
            <h1 className="login-h1">Welcome to Airbode</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-container">
                <div className="login-divs">
                  <span className="login-label">
                    Username or Email
                  </span>
                  <input
                    className="login-input"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </div>
                <div className="login-divs">
                  <label className="login-label">
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
              <ul className="login-form-errors">
                {errors.length ? errors.map((error, idx) => (
                  <li className="login-form-errors-li" key={idx}>{error}</li>
                )) : null}
              </ul>
              <button className="login-btn-modal" type="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
