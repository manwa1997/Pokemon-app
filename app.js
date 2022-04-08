//to control your website
const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//-----------get 5 pokemon--------------//
app.get('/get5pokemon', (req, res) => {
  let rawdata = fs.readFileSync(path.resolve(__dirname, 'files/pokedex.json'));
  let pokemons = JSON.parse(rawdata);
  let pokemon = [];
  let pok = {};
  for (let i = 0; i < 5; i++) {
    let item = pokemons[Math.floor(Math.random() * 808)];
    pok = {
      id: item.id,
      name: item.name['english'],
      type: item.type.join(', '),
      img: `http://localhost:3000/thumbnails/${editimage(item.id)}.png`
    }
    pokemon.push(pok);
  }
  console.log(pokemon);
  res.send(pokemon);
})
//------get pokemon details -------//
app.get('/pokemondetails/:id', (req, res) => {
  let id = (req.params.id) - 1;
  let rawdata = fs.readFileSync(path.resolve(__dirname, 'files/pokedex.json'));
  let pokemons = JSON.parse(rawdata);
  let readmove = fs.readFileSync(path.resolve(__dirname, 'files/pokemonmove.json'));
  let moves = JSON.parse(readmove);
  let item = pokemons[id];
  let pok = {
    id: item.id,
    img: `http://localhost:3000/images/${editimage(item.id)}.png`,
    name: item.name['english'],
    type: item.type.join(', '),
    base: {
      HP: item.base.HP,
      Attack: item.base.Attack,
      Defense: item.base.Defense,
      "Sp. Attack": item.base["Sp. Attack"],
      "Sp. Defense": item.base["Sp. Defense"],
      "Speed": item.base.Speed

    },
    move: moves[Math.floor(Math.random() * 32)].move.name


  }
  res.send(pok);
})
//------------captured pokemon ----------------//
app.put('/pokemoncaptured/:id&&:captured', (req, res) => {
  let id = (req.params.id) - 1;
  let captured = req.params.captured;
  let rawdatacaptured = fs.readFileSync(path.resolve(__dirname, 'files/pokemoncaptured.json'));
  let pokemonscaptured = JSON.parse(rawdatacaptured);
  let rawdata = fs.readFileSync(path.resolve(__dirname, 'files/pokedex.json'));
  let pokemons = JSON.parse(rawdata);
  let item = pokemons[id];
  let pok = {
    id: item.id,
    name: item.name['english'],
    type: item.type.join(', '),
    img: `http://localhost:3000/thumbnails/${editimage(item.id)}.png`
  };
  let newcaptured = [];
  if (captured == "true") {
    pokemonscaptured.push(pok);
    newcaptured = [...pokemonscaptured];
  }
  if (captured == "false") {
    id = id + 1;
    pokemonscaptured.forEach(function (arrayItem) {
      if (arrayItem.id !== id) {
        newcaptured.push(arrayItem);
      }
    });

  }
  console.log(newcaptured);
  newcaptured = [...new Set(newcaptured)];
  fs.writeFileSync(path.resolve(__dirname, 'files/pokemoncaptured.json'), JSON.stringify(newcaptured));
  res.send("operation done");

})
//---- func to edit image name -----//
function editimage(id) {
  if (id < 10) {
    return ('00' + id);
  } if (10 < id < 100) {
    return ('0' + id);
  } if (100 < id < 1000) {
    return (id);
  }
}
//404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})