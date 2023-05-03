const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper(); //gestor de la database 

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); //esto es para que el hbs engine tenga referencia a la carpeta views y sus archivos

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => { 
  punkAPI.getBeers() //llamamos este metodo getBeers() que retorna una promise.
  .then(response => {
    // for(let i = 0; i < response.length; i++) {
    //   console.log(response[i].name)
    // }
    // response.forEach(beer => {
    //   console.log(beer.name)
      
    // });
    console.log('response get beers', response) //when you call this method you get an array of 25 beers
    res.render('beers', { beers: response }) //aqui se crea un objeto con el nombre que yo asigne (aqui, beers) que me trae como response lo que yo le pedi a la api que me trajera
  })
  .catch(err => {
    console.log(err)
  })
});

app.get('/random-beers', (req, res) => { 
  punkAPI.getRandom()
  .then(response => {
  res.render('random-beers', {beers: response})
  })
  .catch(err => {
    console.log(err)
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
