const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const { ValidationError } = require('sequelize');
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const s3 = new aws.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_ACCESS_SECRET,
//   region: "us-west-1"
// });

// // image trial
// const multer = require('multer');
// // ^^^

const { environment } = require('./config');
const routes = require('./routes');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

// multer middleware
// const fileStorage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (_req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileStorage = multerS3({
//   s3,
//   bucket: process.env.BUCKET_NAME,
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: "TESTING_METADATA" });
//   },
//   key: function (req, file, cb) {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   },
// })

// const fileFilter = (_req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       const err = new Error('Only .png, .jpg and .jpeg format allowed.')
//       err.statusCode = 500;
//       return cb(err);
//     }
//   };
  // ^^^^^

  // use multer
  // app.use(
  //   multer({ storage: fileStorage, fileFilter: fileFilter }).array('image', 10)
  // );

// app.use('/images', express.static(path.join(__dirname, 'images')));

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// routes must be below app.use(csurf)
app.use(routes);

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
})

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  // aws
  if (res.status === 503 ) return res.json({ message: err.message, wrongFormat: true })
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
