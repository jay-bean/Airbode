import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage';
import '../SignupFormPage/SignupForm.css';

function SignupFormModal({ setShowModalLogin }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='nav-signup'>
      <button className='nav-signup-btn' type='button' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;
