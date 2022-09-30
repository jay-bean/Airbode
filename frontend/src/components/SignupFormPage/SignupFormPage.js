// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import LoginFormModal from "../LoginFormModal/LoginFormModal";
// import './SignupForm.css';

// function SignupFormPage({ setShowModal }) {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [labelActive, setLabelActive] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors([]);
//       return dispatch(sessionActions.signup({ email, username, password }))
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) setErrors(data.errors);
//         });
//     }
//     return setErrors(['Passwords must match.']);
//   };

//   return (
//     <div className="login-modal">
//       <div className="login-title">
//         <p onClick={() => setShowModal(false)} className="cancel"></p>
//         <p className="login-title-p">Log in or sign up</p>
//       </div>
//       <h1 className="login-h1">Welcome to Airbode</h1>
//       <form
//         className="login-form"
//         onSubmit={handleSubmit}
//       >
//         <div className="signup-container">
//           <div onClick={() => setLabelActive([0])} className="signup-divs-trial">
//             <div className='label-div-trial'><label className={labelActive.includes(0) || email ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Email</label></div>
//             <input
//               className="login-input-trial"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div onClick={() => setLabelActive([1])} className="signup-divs-trial last">
//             <div className='label-div-trial'><label className={labelActive.includes(1) || username ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Username</label></div>
//             <input
//               className="login-input-trial"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div onClick={() => setLabelActive([2])} className="signup-divs-trial last">
//             <div className='label-div-trial'><label className={labelActive.includes(2) || password ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Password</label></div>
//             <input
//               className="login-input-trial"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div onClick={() => setLabelActive([3])} className="signup-divs-trial last">
//             <div className='label-div-trial'><label className={labelActive.includes(3) || confirmPassword ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Confirm Password</label></div>
//             <input
//               className="login-input-trial"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//         <p className="email-p">We won't email you at all. This website was made for fun and doesn't actually do anything.</p>
//         <ul className="login-form-errors">
//           {errors.map((error, idx) => <li className="login-form-errors-li" key={idx}>{error}</li>)}
//         </ul>
//         <button className="login-btn-modal" type="submit">Sign Up</button>
//       </form>
//       <div className="login-div">
//         <p className="or">Already have an account with us?</p>
//         <p className="line-thru-or"></p>
//         <LoginFormModal/>
//       </div>
//     </div>
//   );
// }

// export default SignupFormPage;
