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
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [beds, setBeds] = useState(null);
  const [baths, setBaths] = useState(null);
  const [pets, setPets] = useState('no');
  const [images, setImages] = useState({});

  const [labelActive, setLabelActive] = useState([]);

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
          <div onClick={() => setLabelActive([0])} className='input-containers'>
            <label className={labelActive.includes(0) || title ? "login-label-nine login-label-active-nine" : 'login-label-nine'}> Title</label>
            <input
              className='login-input'
              type="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([1])} className='input-containers'>
            <label className={labelActive.includes(1) || price ? "login-label-ten login-label-active-ten" : 'login-label-ten'}> Price per night</label>
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
        <div  className='location-container'>
          <div onClick={() => setLabelActive([2])} className='input-containers'>
            <label className={labelActive.includes(2) || address ? "login-label-eleven login-label-active-eleven" : 'login-label-eleven'}> Address</label>
            <input
              className='login-input'
              type="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([3])} className='input-containers'>
            <label className={labelActive.includes(3) || city ? "login-label-twelve login-label-active-twelve" : 'login-label-twelve'}> City</label>
            <input
              className='login-input'
              type="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([4])} className='input-containers'>
            <label className={labelActive.includes(4) || state ? "login-label-thirteen login-label-active-thirteen" : 'login-label-thirteen'}> State/Province</label>
            <input
              className='login-input'
              type="state"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([5])} className='input-containers'>
            <label className={labelActive.includes(5) || country ? "login-label-fourteen login-label-active-fourteen" : 'login-label-fourteen'}> Country</label>
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
          <div onClick={() => setLabelActive([6])} className='input-containers'>
            <label className={labelActive.includes(6) || guests ? "login-label-fifteen login-label-active-fifteen" : 'login-label-fifteen'}> Guests</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([7])} className='input-containers'>
            <label className={labelActive.includes(7) || bedrooms ? "login-label-sixteen login-label-active-sixteen" : 'login-label-sixteen'}> Bedrooms</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([8])} className='input-containers'>
            <label className={labelActive.includes(8) || beds ? "login-label-seventeen login-label-active-seventeen" : 'login-label-seventeen'}> Beds</label>
            <input
              className='login-input'
              type="number"
              min='1'
              required
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([9])} className='input-containers'>
            <label className={labelActive.includes(9) || baths ? "login-label-eighteen login-label-active-eighteen" : 'login-label-eighteen'}> Bathrooms</label>
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
        <div onClick={() => setLabelActive([10])} className='input-containers'>
          <label className={labelActive.includes(10) || baths ? "login-label-nineteen login-label-active-nineteen" : 'login-label-nineteen'}> Description</label>
          <textarea
            className='login-input textarea'
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
