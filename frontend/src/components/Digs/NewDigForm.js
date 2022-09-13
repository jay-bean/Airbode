import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDig } from '../../store/digs';
import './dig-form.css';

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
      if (error.status === 503) return setValidationErrors(['Only .png, .jpg and .jpeg format allowed.']);
      const err = await error.json();
      if (error.status >= 500) return setValidationErrors([err.message])
      // else setValidationErrors(err.errors);{
      if (err.errors && err.errors.length > 0) return setValidationErrors(err.errors);
      if (err.message && err.wrongFormat) return setValidationErrors([err.message]);
    }

    if (newDig) {
      setValidationErrors([]);
      history.push(`/digs/${newDig.id}`);
    }
  }

  let imagesArr;
  if (images && images.length) {
    imagesArr = Object.values(images);
  }

  const removeSelectedImage = (e, index) => {
    e.preventDefault();
    imagesArr.splice(index, 1);
    setImages(imagesArr)
  };

  return (
    <div className='new-dig-page'>
      <h1 className='new-dig-h1'>Host Form</h1>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div className='errors' key={error}>{error}</div>
        })
      )}
      <form
        className='new-dig-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className='title-container'>
          <div className='input-containers'>
            <label className='login-label-one'> Title:</label>
            <input
              className='login-input'
              type="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> Price per night:</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className='location-container'>
          <div className='input-containers'>
            <label className='login-label-one'> Address:</label>
            <input
              className='login-input'
              type="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> City:</label>
            <input
              className='login-input'
              type="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> State/Province:</label>
            <input
              className='login-input'
              type="state"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> Country:</label>
            <input
              className='login-input'
              type="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className='amenities-container'>
          <div className='input-containers'>
            <label className='login-label-one'> Guests:</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> Bedrooms:</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> Beds:</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>
          <div className='input-containers'>
            <label className='login-label-one'> Bathrooms:</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            />
          </div>
        </div>
        <div>
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
        </div>
        <div className='input-containers'>
          <label className='login-label-one-textarea'> Description:</label>
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
        </div>
        <div className='new-dig-img-div'>
          <label className='new-dig-label-imgs'>
            <i className="fa-solid fa-images"></i> Upload Images
          <input
            className='new-dig-input-imgs'
            type="file"
            multiple
            name="file"
            onChange={(e) => setImages(e.target.files)}
            />
          </label>
          <p className='upload-p'>* please upload between 5 and 20 photos</p>
        </div>
        {images && images.length ? (
                  <div className="thumbnail-container">
                  {imagesArr.map((image, index) => {
                    return (
                      <div className='thumbnail-divs'>
                        <button type='button' className='thumbnail-remove-btn' onClick={(e) => removeSelectedImage(e, index)}>
                          X
                        </button>
                        <img
                          style={{maxWidth: "100%", maxHeight: '320px' }}
                          src={URL.createObjectURL(image)}
                          alt='thumbnail'
                        />
                      </div>
                    );
                  })}
                </div>
            ) : null}
        <div className='btn-div'>
          <button className='new-dig-submit-btn' type="submit">Add Home</button>
          <button className='new-dig-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewDigForm;
