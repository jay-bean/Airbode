function Dig({dig}) {
  return (
    <li>
      <div>{dig.name}</div>
      <div>{dig.address}</div>
      <div>{dig.city}</div>
      <div>{dig.state}</div>
      <div>{dig.country}</div>
      <div>{dig.price}</div>
    </li>
  );
}

export default Dig;
