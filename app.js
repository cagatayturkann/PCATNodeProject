const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

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

//ROUTE
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'views/index.html')); //middleware ile index dosyasını çağırdık.
  const photos = await Photo.find({});
  res.render('index', {
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
