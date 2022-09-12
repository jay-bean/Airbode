import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../SignupFormPage/SignupForm.css';

function LoginFormModal() {
  const [showModalLogin, setShowModalLogin] = useState(false);

  return (
    <div className='login-btn-div'>
      <button className='login-btn' onClick={() => setShowModalLogin(true)}>Log In</button>
      {showModalLogin && (
        <Modal onClose={() => setShowModalLogin(false)}>
          <LoginForm setShowModalLogin={setShowModalLogin}/>
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
