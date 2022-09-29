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
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [beds, setBeds] = useState();
  const [baths, setBaths] = useState();
  const [pets, setPets] = useState('no');
  const [images, setImages] = useState({});

  const [labelActive, setLabelActive] = useState([]);

  const handleCancel = () => {
    setValidationErrors([]);
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 20) return setValidationErrors(['Only twenty photos max are allowed.']);
    if (images.length < 5) return setValidationErrors(['Please upload at least five photos of your property.']);

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
      <form
        className='new-dig-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className='title-container'>
          <div onClick={() => setLabelActive([0])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(0) || title ? "login-label-trial login-label-active-trial" : 'login-label-trial'}> Title</label></div>
            <input
              className='login-input-trial'
              type="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([1])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(1) || price ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Price per night</label></div>
            <input
              className='login-input-trial'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div  className='location-container'>
          <div onClick={() => setLabelActive([2])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(2) || address ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Address</label></div>
            <input
              className='login-input-trial'
              type="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([3])} className='input-containers-trial'>
          <div className='label-div-trial'><label className={labelActive.includes(3) || city ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>City</label></div>
            <input
              className='login-input-trial'
              type="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([4])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(4) || state ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>State/Province</label></div>
            <input
              className='login-input-trial'
              type="state"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([5])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(5) || country ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Country</label></div>
            <input
              className='login-input-trial'
              type="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className='amenities-container'>
          <div onClick={() => setLabelActive([6])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(6) || guests ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Guests</label></div>
            <input
              className='login-input-trial'
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([7])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(7) || bedrooms ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Bedrooms</label></div>
            <input
              className='login-input-trial'
              required
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([8])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(8) || beds ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Beds</label></div>
            <input
              className='login-input-trial'
              required
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>
          <div onClick={() => setLabelActive([9])} className='input-containers-trial'>
            <div className='label-div-trial'><label className={labelActive.includes(9) || baths ? "login-label-trial login-label-active-trial" : 'login-label-trial'}>Bathrooms</label></div>
            <input
              className='login-input-trial'
              required
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            />
          </div>
        </div>

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

        <div onClick={() => setLabelActive([10])} className='input-containers-trial textarea-container'>
          <div className='label-div-trial-textarea'><label className={labelActive.includes(10) || description ? "login-label-trial login-label-active-trial-textarea" : 'login-label-trial'}>Description</label></div>
          <textarea
            className='login-input-trial textarea'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='new-dig-img-div'>
            <input
              className='new-dig-label-imgs'
              type="file"
              multiple
              name="file"
              onChange={(e) => setImages(e.target.files)}
              />
          <p className='upload-p'>* please upload between 5 and 20 photos</p>
        </div>
        {images && images.length ? (
                  <div className="thumbnail-container">
                  {imagesArr.map((image, index) => {
                    return (
                      <div key={index} className='thumbnail-divs'>
                        <p className='cancel thumbnail-remove-btn' onClick={(e) => removeSelectedImage(e, index)}></p>
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
        {/* {validationErrors.length > 0 && (
          validationErrors.map(error => {
            return <div className='errors' key={error}>{error}</div>
          })
        )} */}
        <ul className="login-form-errors">
          {validationErrors.length ? validationErrors.map((error, idx) => (
            <li className="login-form-errors-li" key={idx}>{error}</li>
          )) : null}
        </ul>
        <div className='btn-div'>
          <button className='new-dig-submit-btn' type="submit">Add Home</button>
          <button className='new-dig-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewDigForm;
