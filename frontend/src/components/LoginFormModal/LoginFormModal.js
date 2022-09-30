import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../SignupFormPage/SignupForm.css';

function LoginFormModal({ signupBtn }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='login-btn-div'>
      {signupBtn ? <button className='nav-signup-btn' type='button' onClick={() => setShowModal(true)}>Sign Up</button> : <button className='login-btn' onClick={() => setShowModal(true)}>Log In</button>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} signupBtn={signupBtn}/>
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
