const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
//const allBeers = PunkAPI.getBeers()

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
  console.log('Beers from database : ', beersFromApi)
  res.render('beers', {beersFromApi})})
  .catch(err => console.log(err));
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
