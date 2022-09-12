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
  // const [images, setImages] = useState(dig && dig.images.length ? dig.images : '');
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
    e.preventDefault();

    if (oldImages.length > 20 || images.length > 20 || oldImages.length + images.length > 20) return setValidationErrors(['Only twenty photos max are allowed.']);
    if (oldImages.length < 5 && Object.values(images).length < 5) return setValidationErrors(['Please upload at least five photos of your property.']);

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

    let newDig;
    try {
      newDig = await dispatch(editDig(formData, id));
    }
    catch (error) {
      if (error.status === 503) return setValidationErrors(['Only .png, .jpg and .jpeg format allowed.']);
      const err = await error.json();
      if (error.status >= 500) return setValidationErrors([err.message])
      if (err.message && err.wrongFormat) return setValidationErrors([err.message]);
      if (err.errors && err.errors.length > 0) return setValidationErrors(err.errors);
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
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div className='errors'>{error}</div>
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
      </form>
    </div>
  );
}

export default EditDigForm;
