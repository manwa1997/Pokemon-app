const pokedex = document.getElementById('pokedex');
let pokemon = [];
let promises1 = [];
let pokemons = [];
const promises = [];
for (let id = 1; id <= 150; id++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    promises1.push(fetch(url).then((res) => res.json()));
    //console.log(promises);
}
Promise.all(promises1).then((results) => {
    pokemons = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(", "),


    }));


});
const fectchpokemon = () => {

    for (let id = 1; id <= 8; id++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150)}`;
        promises.push(fetch(url).then((res) => res.json()));
        //console.log(promises);
    }
    Promise.all(promises).then((results) => {
        pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(", "),
            move: data.moves.map((move) => move.move.name).join(', '),
            stat: data.stats.map((stat) => stat.base_stat).join(', ')


        }));

        displayPokemon(pokemon);

    });

};
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map((pokeman) => `

    <li class="card" >
    <div style=" 
    bottom: 0px;
    left: 50%;">
    <input type="button" value="show !"/ onclick="selectPokemon(${pokeman.id})">
</div>
    <h5>${pokeman.id}<h5>
    <img class="card-image" src="${pokeman.image}"/>
    <h3 class="card-title">${pokeman.name}<h3>
    <h4 class="card-subtitle">${pokeman.type}</h2>
    <label class="switch"> 
    <input type="checkbox" name="captured">
    <span class="slider"> </span>
    </label>
    </li> 
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};
const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPok(pokeman);
}

const displayPok = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(", ");
    const move = pokeman.moves.map((move) => move.move.name);
    const stat = pokeman.stats.map((stat) => stat.base_stat);

    console.log(stat);
    const image = pokeman.sprites['front_default'];
    const htmlString = `
    <div id="container1">

    <button id = "x" onclick="closePok()">
            X
        </button>
        <div class="header">
    <img class="card-image" src="${image}"/>
    <h2 class="card-title">${pokeman.name}<h2>
    <h3>Type(s)<h3>
    <h4 class="card-subtitle">${type}</h2>
    </div>
    <!-----------------------------content ---->
    <div style="padding:20px;">
    <h2>state</h2>
    <table style="width:100%">
  <tr>
    <td><strong>hp:    </strong><progress  value=${stat[0]} max="100"> </progress>${stat[0]}%</td>
  
  </tr>

  <tr>
    <td  ><strong>attack:    </strong><progress  value=${stat[1]} max="100"></progress>${stat[1]}%</td>
  </tr>
  
  <tr>
  <td  ><strong>defense:    </strong><progress  value=${stat[2]} max="100"></progress>${stat[2]}%</td>
  </tr>
  <tr>
  <td></td>  <td></td> <td></td>  <td></td>
</tr>
<tr>
<td  ><strong>special-attack:    </strong><progress  value=${stat[3]} max="100"></progress>${stat[3]}%</td>
</tr>
<tr>
<td></td>  <td></td> <td></td>  <td></td>
</tr>
<tr>
<td  ><strong>special-defense:    </strong><progress  value=${stat[4]} max="100"> </progress>${stat[4]}%</td>
</tr>
<tr>
<td></td>  <td></td> <td></td>  <td></td>
</tr>
<tr>
<td  ><strong>speed: </strong><progress  value=${stat[5]} max="100"> </progress>${stat[5]}%</td>
</tr>

</table>


</div>
<!-----------------------------footer---->
   
<footer id="footer">
<div id="footer-content">
<h2>Moves</h2>
<ul >
<li>${move[0]}</li>
<li>${move[1]}</li>
<li>${move[2]}</li>
</ul>
<ul>
<li>${move[3]}</li>
<li>${move[4]}</li>
<li>${move[5]}</li>
</ul>
<ul>
<li>${move[6]}</li>
<li>${move[7]}</li>
<li>${move[8]}</li>
</ul>
<ul>
<li>${move[9]}</li>
<li>${move[10]}</li>
<li>${move[11]}</li>
</ul>
<ul>
<li>worry</li>
<li>seed-bomb</li>
<li>energy-ball</li>
</ul>
</div>
</footer>
    </div>
    
    `
    console.log(pokeman);
    pokedex.innerHTML = htmlString;

}
function closePok() {
    window.location.href = 'main.html';
}
const searchPok = document.getElementById('searchpokemon');
//
searchPok.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = pokemons.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );

    });

    displayPokemon(filteredCharacters);
});
fectchpokemon();