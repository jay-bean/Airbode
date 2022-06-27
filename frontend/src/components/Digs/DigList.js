import { useSelector } from "react-redux";
import Dig from "./Dig";


function DigList() {
  // const digs = useSelector(state => {
  //   return state.dig.list.map(digI => state.pokemon[pokemonId]);
  // });
  const digs = useSelector((state) => state.digs);
  console.log(digs, 'this is the diggggg');
  return (
    <ul>
      {Object.values(digs).map(dig => {
        console.log(dig)
        return <Dig key={dig.id} dig={dig}/>
      })}
    </ul>
  );
}

export default DigList;
