import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage';
import '../SignupFormPage/SignupForm.css';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='nav-signup'>
      <button className='nav-signup-btn' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;
