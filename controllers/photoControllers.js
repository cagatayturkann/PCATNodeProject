const Photo = require('../models/Photo');
const fs = require('fs');

//listing all the photos from database
exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1; //page number user in
  const photosPerPage = 2; //photo number per page
  const totalPhotos = await Photo.find().countDocuments(); //returns total document number from database
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage) //skipping first photos when user in other pages
    .limit(photosPerPage); // photo number per page
  res.render('index', {
    photos: photos,
    current: page, //sending page number to ejs 
    pages: Math.ceil(totalPhotos / photosPerPage), //total page number
  });
  // res.sendFile(path.resolve(__dirname, 'views/index.html')); //middleware ile index dosyasını çağırdık.
};

//showing selected photo
exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

//creating photo and saving to database
exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    //checking upload directory exist or not. If not create
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image; //getting images
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name; //defining directory path for saving images

  uploadedImage.mv(uploadPath, async () => {
    //saving photo to directory function. first parameters is path second is moving function
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

//editing photo
exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

//deleting photo from database
exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
