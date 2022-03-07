const express = require('express');
const ejs = require('ejs')
const path = require('path');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs') //template engine views klasörü içerisine bakar

//MIDDLEWARES
app.use(express.static('public'));

//ROUTE
app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'views/index.html')); //middleware ile index dosyasını çağırdık. 
  res.render('index')
});
app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/add', (req, res) => {
  res.render('add')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
