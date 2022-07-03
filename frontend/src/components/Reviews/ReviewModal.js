import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DigReviewList from './DigReviewList';

function ReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Reviews</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DigReviewList />
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;
