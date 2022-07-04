import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CarouselComponent from "../Carousel/CarouselComponent";

function DigList() {
  const digs = useSelector((state) => state.digs);

  return (
    <ul className="digs-home-page">
      {Object.values(digs).map(dig => {
        return (
          <Link className="dig-home-page-link"key={dig.id} to={`/digs/${dig.id}`}>
            <li className="dig-home-page" dig={dig}>
              <div className="dig-home-page-image-div">
              {dig.images && dig.images.length ? <img className="dig-home-page-image" src={`/${dig.images[0].url}`}/> : null}
              </div>
              <div className="dig-home-text">{dig.city}, {dig.state}</div>
              <div className="dig-home-text">{dig.country}</div>
            </li>
          </Link>
        );
      }).reverse()}
    </ul>
  );
}

export default DigList;
