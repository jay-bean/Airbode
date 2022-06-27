import { useSelector } from "react-redux";



function DigList() {
  const digs = useSelector((state) => state.digs);
  console.log(digs, 'this is the diggggg');
  return (
    <ul>
      {Object.values(digs).map(dig => {
        console.log(dig)
        return  <li key={dig.id} dig={dig}>{dig.name}</li>
      })}
    </ul>
  );
}

export default DigList;
