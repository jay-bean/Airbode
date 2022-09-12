import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DigReviewList from './DigReviewList';
import '../Digs/dig.css';

function ReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='dig-review-btn' onClick={() => setShowModal(true)}>Reviews</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DigReviewList setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;
