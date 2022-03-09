const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');
const { resolveNaptr } = require('dns');

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost:27017/pcat-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs'); //template engine views klasörü içerisine bakar

//MIDDLEWARES
app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

//ROUTE
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'views/index.html')); //middleware ile index dosyasını çağırdık.
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });

  // res.render('about');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    //klasör var mı yok mu bak. yoksa oluştur.
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image; //image'ı yakaladık.
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name; //dosya yolunu belirttik.

  uploadedImage.mv(uploadPath, async () => {
    //taşıma fonksiyonu. ilk parametre yol, ikinci parametre ekleme fonksiyonu
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });

  // await Photo.create(req.body);
  // res.redirect('/');
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});
app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`)
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
