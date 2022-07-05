import Gallery from 'react-grid-gallery';

function GridGallery({images}) {
 const IMAGES = images.map(image =>  {
   return {src: `${image.url}`, thumbnail: `${image.url}`, thumbnailWidth: 320, thumbnailHeight: 212}
  });
  return (
    <Gallery images={IMAGES}/>
  );
}

export default GridGallery;
