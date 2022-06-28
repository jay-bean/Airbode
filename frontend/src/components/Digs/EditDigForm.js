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
  const [pets, setPets] = useState(dig.pets);


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
        <label> Address:
        <input
          type="address"
          placeholder="123 West Avenue"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        </label>
        <label> City:
        <input
          type="city"
          placeholder="Colorado Springs"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </label>
        <label> State/Province:
        <input
          type="state"
          placeholder="Colorado"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        </label>
        <label> Country:
        <input
          type="country"
          placeholder="United States"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        </label>
        <label> Title:
        <input
          type="title"
          placeholder="Cottage in the mountain"
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
          placeholder="Tell us about your home..."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <label> How many guests allowed:
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
          value="no"
          name="pets"
          onChange={(e) => setPets(e.target.value)}
          checked={pets === 'no' ? false : true}
        />
        Yes
        </label>
        <label>
        <input
            type="radio"
            value="yes"
            name="pets"
            onChange={(e) => setPets(e.target.value)}
            checked={pets === 'yes' ? true : false}
        />
        No
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default EditDigForm;
