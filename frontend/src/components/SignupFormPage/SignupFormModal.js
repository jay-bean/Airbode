// import React, { useState, useEffect } from 'react';
// import { Modal } from '../../context/Modal';
// import SignupFormPage from './SignupFormPage';
// import '../SignupFormPage/SignupForm.css';

// function SignupFormModal({ showModalSignup }) {
//   const [showModal, setShowModal] = useState(false);

//   if (showModalSignup) {
//     console.log(showModalSignup, 'signup true hopefully')
//     setShowModal(true)
//   };

//   return (
//     <div className='nav-signup'>
//       <button className='nav-signup-btn'></button>
//       <button className='nav-signup-btn' type='button' onClick={() => setShowModal(true)}>Sign Up</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <SignupFormPage setShowModal={setShowModal}/>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default SignupFormModal;
