import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDig } from '../../store/digs';
import './new-dig-form.css';

function NewDigForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [validationErrors, setValidationErrors] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [pets, setPets] = useState('no');
  const [images, setImages] = useState({});

  const handleCancel = () => {
    setValidationErrors([]);
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('guests', guests);
    formData.append('bedrooms', bedrooms);
    formData.append('beds', beds);
    formData.append('baths', baths);
    formData.append('pets', pets);
    formData.append('userId', sessionUser.id);

    for(const image of Object.keys(images)) {
      formData.append('image', images[image]);
    }

    let newDig;
    try {
      newDig = await dispatch(addDig(formData));
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
    <div className='new-dig-page'>
      <h1 className='new-dig-h1'>New House Form</h1>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div key={error}>{error}</div>
        })
      )}
      <form
        className='new-dig-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label className='new-dig-label'> Address:
        <input
          className='new-dig-input'
          type="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> City:
        <input
          className='new-dig-input'
          type="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> State/Province:
        <input
          className='new-dig-input'
          type="state"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Country:
        <input
          className='new-dig-input'
          type="country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Title:
        <input
          className='new-dig-input'
          type="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Price per night:
        <input
          className='new-dig-input'
          type="number"
          min='1'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Guests:
        <input
          className='new-dig-input'
          type="number"
          min='1'
          required
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Bedrooms:
        <input
          className='new-dig-input'
          type="number"
          min='1'
          required
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Beds:
        <input
          className='new-dig-input'
          type="number"
          min='1'
          required
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        </label>
        <label className='new-dig-label'> Bathrooms:
        <input
          className='new-dig-input'
          type="number"
          min='1'
          required
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />
        </label>
        <label className='new-dig-label-pets'> Pets Okay?
        <input
          className='new-dig-input-pets'
          type="radio"
          value="yes"
          name="pets"
          onChange={(e) => setPets(e.target.value)}
          checked={pets === 'yes'}
        /> Yes
        <input
          className='new-dig-input-pets'
          type="radio"
          value="no"
          name="pets"
          onChange={(e) => setPets(e.target.value)}
          checked={pets === "no"}
        /> No
        </label>
        <label className='new-dig-label'> Upload Images
        <input
          className='new-dig-input'
          type="file"
          multiple
          name="file"
          onChange={(e) => setImages(e.target.files)}
        />
        </label>
        <label className='new-dig-label-textarea'> Description:
        <textarea
          className='new-dig-input-textarea'
          rows="4"
          cols="30"
          type="description"
          placeholder="Tell us about your home..."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <div className='btn-div'>
          <button className='new-dig-submit-btn' type="submit">Add Home</button>
          <button className='new-dig-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewDigForm;
