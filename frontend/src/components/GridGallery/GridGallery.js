import { useState, useEffect } from 'react';
import './gallery.css';

function GridGallery({ images }) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      {!showGallery && <button onClick={() => setShowGallery(true)} className='leading-photo-btn'><span className='square-dots'></span> Show all photos</button>}
      {showGallery &&
        <div className='gallery-container'>
          <button className='close-gallery' onClick={() => setShowGallery(false)}>x</button>
          <div className='images-container'>
            {images && images.length ? images.map(image => {
              return (
                // <div className='image-divs'>
                  <img className='gallery-images' src={image.url}/>
                // </div>
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
