const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Connect DB
mongoose.connect('mongodb://localhost:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Photo description 2 lorem ipsum',
// });

//read a photo
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

//update a photo
// const id = '6227d41e1e7594ee5d4ef8c8';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 11 updated',
//     description: 'Photo description 11 updated',
//   },
//   {
//     new: true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//delete a photo
// const id = '6227d41e1e7594ee5d4ef8c8';
// Photo.findByIdAndDelete(id, (err,data)=> {
//   console.log("Photo is removed");
// })