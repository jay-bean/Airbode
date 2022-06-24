
// using a modal so this is not necessary.. If I wanted to have the login form
// on its own page I could do something similar to this


// import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// import './LoginForm.css';

// function LoginFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
//   const [credential, setCredential] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) return (
//     <Redirect to="/" />
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       });
//   }

//   return (
//     <>
//       <div className='login-form-page-content'>
//         <h1>Log in</h1>
//         {errors.length ? (
//           <ul className='login-form-errors'>
//             {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//           </ul>
//         ) : null}
//         <form className='login-form' onSubmit={handleSubmit}>
//           <label>
//             Username or Email
//             <input
//               type="text"
//               value={credential}
//               onChange={(e) => setCredential(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Password
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Log In</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default LoginFormPage;
