import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './carousel.css';

function CarouselComponent({images, showThumbs = true, infiniteLoop = true, showStatus = false}) {
  return (
    <div className="carousel-wrapper">
      <Carousel showThumbs={showThumbs} infiniteLoop={infiniteLoop} showStatus={showStatus}>
        {images.map(image => <div key={image.id}><img src={`/${image.url}`}/></div>)}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
