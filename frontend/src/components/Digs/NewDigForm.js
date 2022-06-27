import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDig } from '../../store/digs';

function NewDigForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser)
  const handleCancel = (e) => {
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dig = {
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
      newDig = await dispatch(addDig(dig));
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
          placeholder="State"
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
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          type="description"
          placeholder="Tell us about your home"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Home</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default NewDigForm;
