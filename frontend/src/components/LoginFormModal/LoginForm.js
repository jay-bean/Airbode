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
            <h1 className="login-h1">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <ul className="login-form-errors">
                {errors.length ? errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                )) : null}
              </ul>
              <label className="login-label">
                Username or Email
                <input
                  className="login-input"
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
              <label className="login-label">
                Password
                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button className="login-btn-modal" type="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
