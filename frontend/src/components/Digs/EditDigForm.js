import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addDig, getDigs, editDig } from '../../store/digs';

function EditDigForm() {
  const digIdObj = useParams();
  const id = digIdObj.digId;
  const dig = useSelector(state => state.digs[id]);
  console.log(dig, 'this is dig i need on form page');
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(dig.address);
  const [city, setCity] = useState(dig.city);
  const [state, setState] = useState(dig.state);
  const [country, setCountry] = useState(dig.country);
  const [name, setName] = useState(dig.name);
  const [price, setPrice] = useState(dig.price);
  const [description, setDescription] = useState(dig.description);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getDigs());
  }, [])

  const handleCancel = (e) => {
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      address,
      city,
      state,
      country,
      name,
      price,
      description,
      userId: sessionUser.id
    };

    let newDig;
    try {
      newDig = await dispatch(editDig(data, id));
    }
    catch (error) {
      console.log(error)
    }

    if (newDig) {
      history.push(`/digs/${newDig.id}`);
    }
  }

  return (
    <>
      <h1>New House Form</h1>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="address"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="city"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="state"
          placeholder="State/Province"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="country"
          placeholder="Country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="name"
          placeholder="Name for you home"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="price"
          placeholder="Price per night"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <textarea
          type="description"
          placeholder="Tell us about your home"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default EditDigForm;
