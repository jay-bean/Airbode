import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './carousel.css';

function CarouselComponent({images}) {
  console.log(typeof images, images, 'this is the images');
  return (
    <div className="carousel-wrapper">
      <Carousel>
        {images.map(image => <div key={image.id}><img src={`/${image.url}`}/></div>)}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
