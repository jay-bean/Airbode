import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../SignupFormPage/SignupForm.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='login-btn-div'>
      <button className='login-btn' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
