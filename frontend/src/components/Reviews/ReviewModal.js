import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DigReviewList from './DigReviewList';
import ReviewForm from './ReviewForm';
import '../Digs/dig.css';

function ReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='review-modal-container'>
      <button className='dig-review-btn' onClick={() => setShowModal(true)}>Leave review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
           <ReviewForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default ReviewModal;
