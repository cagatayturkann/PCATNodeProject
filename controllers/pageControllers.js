const Photo = require('../models/Photo')

//getting about page
exports.getAboutPage = (req, res) => {
  res.render('about');
};

//getting add page
exports.getAddPage = (req, res) => {
  res.render('add');
};

//getting edit page
exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
