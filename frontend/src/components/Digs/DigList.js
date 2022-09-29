import { Link } from "react-router-dom";
import AverageRating from "./AverageRating";
import { useSelector } from "react-redux";

function DigList() {

  const digs = useSelector((state) => state.digs);
  const reviews = useSelector(state => state.reviews);

  return (
    <>
      {/* <div className="buffer"></div> */}
      <div className="digs-home-page">
        <ul className="digs-home-page-ul">
          {Object.values(digs).map(dig => {
            return (
              <Link className="dig-home-page-link"key={dig.id} to={`/digs/${dig.id}`}>
                <li className="dig-home-page-li" dig={dig}>
                  <div className="dig-home-page-image-div">
                    {dig.images && dig.images.length ? <img className="dig-home-page-image" src={`${dig.images[0].url}`}/> : null}
                  </div>
                  <div className="dig-home-flex">
                    <div className="dig-home-div">
                      <div className="dig-home-location">{dig.city}, {dig.state}</div>
                      <div className="dig-home-price"><span className="dig-home-span">${dig.price}</span> night</div>
                    </div>
                    <div>
                      <AverageRating dig={dig} reviews={reviews}/>
                    </div>
                  </div>
                </li>
              </Link>
            );
          }).reverse()}
        </ul>
      </div>
    </>
  );
}

export default DigList;
