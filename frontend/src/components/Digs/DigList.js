import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DigList() {
  const digs = useSelector((state) => state.digs);

  return (
    <ul className="digs-home-page">
      {Object.values(digs).map(dig => {
        return (
          <Link className="dig-home-page-link"key={dig.id} to={`/digs/${dig.id}`}>
            <li className="dig-home-page" dig={dig}>
              <div>{dig.city}, {dig.state}</div>
              <div>{dig.country}</div>
            </li>
          </Link>
        );
      }).reverse()}
    </ul>
  );
}

export default DigList;
