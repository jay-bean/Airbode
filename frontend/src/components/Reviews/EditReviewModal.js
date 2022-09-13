import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DigReviewList from './DigReviewList';
import '../Digs/dig.css';
import EditReview from './EditReview';

function EditReviewModal({dig, review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='users-reviews-edit-btn' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview reviewProp={review} dig={dig} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
