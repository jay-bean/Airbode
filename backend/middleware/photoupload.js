const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  region: "us-west-1"
});

const fileStorage = multerS3({
  s3,
  bucket: process.env.BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: "TESTING_METADATA" });
  },
  key: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
})

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      const err = new Error('Only .png, .jpg and .jpeg format allowed.')
      err.status = 400;
      return cb(err, false);
    }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).array('image', 10);

const handleUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({errors: ['You cannot upload more than 10 photos.']});
      }
      return next(err);
      // check if max count error. Validation error instance with our message. next(err)

    } else if (err) {
      if(err.message === 'Only .png, .jpg and .jpeg format allowed.'){
        return res.status(400).json({ message: err.message, wrongFormat: true });
      }
      return next(err);
      // An unknown error occurred when uploading.
    }
     return next();
  })
}

module.exports = {
  handleUpload,
};
