import { useState, useEffect } from 'react';
import './gallery.css';

function GridGallery({ images }) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      {!showGallery && <button onClick={() => setShowGallery(true)} className='leading-photo-btn'><span className='square-dots'></span> Show all photos</button>}
      {showGallery &&
        <div className='gallery-container'>
          <div className='cancel-buffer'>
            <button className='close-gallery-container' onClick={() => setShowGallery(false)}><p className='close-gallery'></p></button>
          </div>
          <div className='images-container'>
            {images && images.length ? images.map(image => {
              return (
                <img className='gallery-images' src={image.url}/>
              );
            })
            : null}
          </div>
        </div>
      }
    </>
  );
}

export default GridGallery;
