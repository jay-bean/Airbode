import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDigs, editDig } from '../../store/digs';

function EditDigForm() {
  const digIdObj = useParams();
  const id = digIdObj.digId;
  const dig = useSelector(state => state.digs[id]);
  console.log(dig, 'this is dig i need on form page');
  const history = useHistory();
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [address, setAddress] = useState(dig.address);
  const [city, setCity] = useState(dig.city);
  const [state, setState] = useState(dig.state);
  const [country, setCountry] = useState(dig.country);
  const [title, setTitle] = useState(dig.title);
  const [price, setPrice] = useState(dig.price);
  const [description, setDescription] = useState(dig.description);
  const [guests, setGuests] = useState(dig.guests);
  const [bedrooms, setBedrooms] = useState(dig.bedrooms);
  const [beds, setBeds] = useState(dig.beds);
  const [baths, setBaths] = useState(dig.baths);
  const [pets, setPets] = useState(dig.pets ? 'yes' : 'no');
  console.log(typeof dig.pets, 'this is digipets', dig.pets);


  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch])

  const handleCancel = (e) => {
    setValidationErrors([]);
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      address,
      city,
      state,
      country,
      title,
      price,
      description,
      guests,
      bedrooms,
      beds,
      baths,
      pets,
      userId: sessionUser.id
    };

    let newDig;
    try {
      newDig = await dispatch(editDig(data, id));
    }
    catch (error) {
      const err = await error.json();
      setValidationErrors(err);

    }

    if (newDig) {
      setValidationErrors([]);
      history.push(`/digs/${newDig.id}`);
    }
  }

  return (
    <>
      <h1>Edit Home</h1>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div>{error}</div>
        })
      )}
      <form
        onSubmit={handleSubmit}
      >
        <label> Address:
        <input
          type="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        </label>
        <label> City:
        <input
          type="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </label>
        <label> State/Province:
        <input
          type="state"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        </label>
        <label> Country:
        <input
          type="country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        </label>
        <label> Title:
        <input
          type="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </label>
        <label> Price per night:
        <input
          type="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </label>
        <label> Description:
        <textarea
          type="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <label> Guests:
        <input
          type="guest"
          required
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        </label>
        <label> Bedrooms:
        <input
          type="bedrooms"
          required
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        </label>
        <label> Beds:
        <input
          type="beds"
          required
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        </label>
        <label> Bathrooms:
        <input
          type="baths"
          required
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />
        </label>
        <label> Pets Okay?
        <input
          type="radio"
          value="yes"
          name="pets"
          onChange={(e) => setPets(e.target.value)}
          checked={pets === 'yes'}
        /> Yes
        <input
            type="radio"
            value="no"
            name="pets"
            onChange={(e) => setPets(e.target.value)}
            checked={pets === 'no'}
        /> No
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default EditDigForm;
