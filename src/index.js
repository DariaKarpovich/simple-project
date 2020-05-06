import './styles/index.scss';
import View from './View';
import PokemonClient from './PokemonClient';

let idPokemon;
let comments = [];

const pokemonClient = new PokemonClient('https://pokeapi.co/api/v2/pokemon');

function pokemonInfo(name) {
  pokemonClient.getDetails(name)
    .then((pokemon) => {
      idPokemon = pokemon.id;
      View.showDetails(pokemon);
    })
    .then(() => {
      document.getElementById('comments').innerHTML = '';
      comments = JSON.parse(localStorage.getItem('comments'));
      if (localStorage.getItem('comments')) View.showComments(pokemonClient.loadComments(comments));
    });
  document.getElementById('divComment').hidden = false;
}

pokemonClient.getList()
  .then((pokemons) => View.showList(pokemons, pokemonInfo));

function page(isNext = true) {
  pokemonClient.getList(isNext)
    .then((res) => View.showList(res, pokemonInfo));
}

function sort() {
  View.showList(pokemonClient.sort(), pokemonInfo);
}

function search() {
  const inputValue = document.getElementById('search').value;
  View.showList(pokemonClient.search(inputValue), pokemonInfo);
}

document.getElementById('search').onkeydown = () => search();
document.getElementById('sort').onclick = () => sort();
document.getElementById('next').onclick = () => page(true);
document.getElementById('back').onclick = () => page(false);

function getComments() {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();
  const userName = document.getElementById('userName');
  const textComment = document.getElementById('textComment');

  const comment = {
    userName: userName.value,
    textComment: textComment.value,
    time: Date.now(),
    idPokemons: idPokemon,
  };

  userName.value = '';
  textComment.value = '';
  comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.unshift(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
  View.showComments(pokemonClient.loadComments(comments));
}

document.getElementById('addComment').onclick = () => getComments();
