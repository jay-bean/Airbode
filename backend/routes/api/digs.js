const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { Dig, Image } = require('../../db/models');
const { digValidators, editDigValidators } = require('../../validations');
const { handleUpload } = require('../../middleware/photoupload')
const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const digs = await Dig.findAll({
      include: [{model: Image, as: 'images'}]
    });
    return res.status(200).json(digs);
  })
);

router.get('/:digId(\\d+)',
  asyncHandler(async (req, res) => {
    const dig = await Dig.findOne(req.params.id);
    return res.json(dig);
  })
);

router.post('/',
  handleUpload,
  digValidators,
  asyncHandler(async (req, res) => {
    console.log('hi')
    const { address, city, state, country, title, price, description, guests, bedrooms, beds, baths, pets, userId } = req.body;
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map(error => error.msg);
      return res.status(400).json(errors);
    }

    if (!req.files.length || req.files.length < 5) {
      return res.status(400).json(['You must provide at least five photos of your property.']);
    }

    const dig = Dig.build({
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
      userId
    });
    const result = await dig.save({raw: true});

    // multer trials

    const images = req.files;
    const imageObjs = images.map(el => {
      const image = Image.build({
        url: el.location,
        digId: result.id
      });
      return image;
    })

    const resImages = await Promise.all(imageObjs.map(async (image) => await image.save()))

    const response = {
        ...result.dataValues,
        images: resImages
    }

    return res.status(200).json(response);
  })
)

router.put(`/:digId(\\d+)`,
  handleUpload,
  editDigValidators,
  asyncHandler(async (req, res) => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map(error => error.msg);
      return res.status(400).json(errors);
    }

    // updating park
    const dig = await Dig.findByPk(req.params.digId);
    dig.address = req.body.address;
    dig.city = req.body.city;
    dig.state = req.body.state;
    dig.country = req.body.country;
    dig.title = req.body.title;
    dig.price = req.body.price;
    dig.description = req.body.description;
    dig.guests = req.body.guests;
    dig.bedrooms = req.body.bedrooms;
    dig.beds = req.body.beds;
    dig.baths = req.body.baths;
    dig.pets = req.body.pets;
    const result = await dig.save();

    const images = req.files;
    const imageObjs = images.map(el => {
      const image = Image.build({
        url: el.location,
        digId: req.params.digId,
      });
      return image;
    })

    const currentImages = await Image.findAll({
      where: { digId: req.params.digId},
      raw: true
    })

    if (req.body.oldImage && req.body.oldImage.length && currentImages.length) {
      for (let i = 0; i < req.body.oldImage.length; i++)  {
        for (let j = 0; j < currentImages.length; j++) {
          if (currentImages[j].id === Number(req.body.oldImage[i])) {
            currentImages.splice(j, 1);
          }
        }
      }
      await Promise.all(currentImages.map(async img => {
        const deleteImg = await Image.findByPk(img.id);
        await deleteImg.destroy();
        return deleteImg.id;
      }))
    }
    await Promise.all(imageObjs.map(async (image) => await image.save()));

    // updated info to return
    const updatedDig = await Dig.findByPk(req.params.digId);
    const updatedImages = await Image.findAll({
      where: { digId: req.params.digId},
      raw: true
    })


    const response = {
      ...updatedDig.dataValues,
      images: updatedImages,
  }
    return res.status(200).json(response);
  })
)

router.delete('/:digId(\\d+)',
  asyncHandler(async (req, res) => {
    const dig = await Dig.findByPk(req.params.digId);
    await dig.destroy();
    return res.json({id: req.params.digId});
  })

);

module.exports = router;
