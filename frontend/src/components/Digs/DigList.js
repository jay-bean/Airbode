import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



function DigList() {
  const digs = useSelector((state) => state.digs);

  return (
    <ul>
      {Object.values(digs).map(dig => {
        return  <Link key={dig.id} to={`/digs/${dig.id}`}><li dig={dig}>{dig.title}</li></Link>
      })}
    </ul>
  );
}

export default DigList;
