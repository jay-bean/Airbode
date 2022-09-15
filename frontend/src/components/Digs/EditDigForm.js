import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDigs, editDig } from '../../store/digs';
import '../../main.css';
import './dig-form.css'
function EditDigForm() {
  const digIdObj = useParams();
  const id = digIdObj.digId;
  const dig = useSelector(state => state.digs[id]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([]);
  const [address, setAddress] = useState(dig ? dig.address : '');
  const [city, setCity] = useState(dig ? dig.city : '');
  const [state, setState] = useState(dig ? dig.state : '');
  const [country, setCountry] = useState(dig ? dig.country : '');
  const [title, setTitle] = useState(dig ? dig.title : '');
  const [price, setPrice] = useState(dig ? dig.price : '');
  const [description, setDescription] = useState(dig ? dig.description : '');
  const [guests, setGuests] = useState(dig ? dig.guests : '');
  const [bedrooms, setBedrooms] = useState(dig ? dig.bedrooms : '');
  const [beds, setBeds] = useState(dig ? dig.beds : '');
  const [baths, setBaths] = useState(dig ? dig.baths : '');
  const [pets, setPets] = useState(dig && dig.pets ? 'yes' : 'no');
  const [oldImages, setOldImages] = useState(dig && dig.images.length ? dig.images : []);
  const [images, setImages] = useState({});
  const [labelActive, setLabelActive] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch])

  const handleCancel = (e) => {
    setValidationErrors([]);
    history.push("/")
  };
// how can I make sure that only 10 photos are uploaded? can I delete the photos somehow??
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      console.log(oldImages.length , 'old imgys');
      console.log(Object.values(images).length, 'new imgysss')
      if (oldImages.length > 20 || images.length > 20 || oldImages.length + images.length > 20) return setValidationErrors(['Only twenty photos max are allowed.']);
      if (oldImages.length < 5 && Object.values(images).length === 0 || oldImages.length === 0 && Object.values(images).length < 5 || oldImages.length + Object.values(images).length < 5) return setValidationErrors(['Please upload at least five photos of your property.']);

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

      for (const oldImage of oldImages) {
        formData.append('oldImage', oldImage.id)
      }

      for (const image of Object.keys(images)) {
        formData.append('image', images[image]);
      }

      const newDig = await dispatch(editDig(formData, id));

      if (newDig) {
        setLabelActive([]);
        setValidationErrors([]);
        history.push(`/digs/${newDig.id}`);
      }
    }
    catch (error) {
      if (error.status === 503) return setValidationErrors(['Only .png, .jpg and .jpeg format allowed.']);
      const err = await error.json();
      if (error.status >= 500) return setValidationErrors([err.message])
      if (err.message && err.wrongFormat) return setValidationErrors([err.message]);
      if (err.errors && err.errors.length > 0) return setValidationErrors(err.errors);
    }
  }

  let imagesArr;
  if (images && images.length) {
    imagesArr = Object.values(images);
  }

  const removeNewSelectedImage = (e, index) => {
    e.preventDefault();
    imagesArr.splice(index, 1);
    setImages(imagesArr)
  };

  let oldImagesArr;
  if (oldImages && oldImages.length) {
    oldImagesArr = Object.values(oldImages);
  }

  const removeOldSelectedImage = (e, index) => {
    e.preventDefault();
    oldImagesArr.splice(index, 1);
    setOldImages(oldImagesArr);
  };

  return (
    <div className='new-dig-page'>
      <h1 className='new-dig-h1'>Edit Home</h1>
      {/* <form
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
          type="price"
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
          checked={pets === 'no'}
        /> No
        </label>
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
        </div>
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
        {images && images.length ? (
                <div className="thumbnail-container">
                  {imagesArr.map((image, index) => {
                    return (
                      <div key={index} className='thumbnail-divs'>
                        <button type='button' className='thumbnail-remove-btn' onClick={(e) => removeNewSelectedImage(e, index)}>
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
              {oldImages && oldImages.length ? (
                <div className="thumbnail-container">
                  {oldImagesArr.map((image, index) => {
                    return (
                      <div key={index} className='thumbnail-divs'>
                        <button className='thumbnail-remove-btn' onClick={(e) => removeOldSelectedImage(e, index)}>
                          X
                        </button>
                        <img
                          style={{maxWidth: "100%", maxHeight: '320px' }}
                          src={image.url}
                          alt='thumbnail'
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}
        <div className='btn-div'>
          <button className='new-dig-submit-btn' type="submit">Submit</button>
          <button className='new-dig-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form> */}
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
                        <button type='button' className='thumbnail-remove-btn' onClick={(e) => removeNewSelectedImage(e, index)}>
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
        {oldImages && oldImages.length ? (
          <div className="thumbnail-container">
            {oldImagesArr.map((image, index) => {
              return (
                <div key={index} className='thumbnail-divs'>
                  <button className='thumbnail-remove-btn' onClick={(e) => removeOldSelectedImage(e, index)}>
                    X
                  </button>
                  <img
                    style={{maxWidth: "100%", maxHeight: '320px' }}
                    src={image.url}
                    alt='thumbnail'
                  />
                </div>
              );
            })}
          </div>
        ) : null}
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

export default EditDigForm;
