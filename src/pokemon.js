import PokemonImg from '../src/assets/images/giphy.gif';
import '../src/styles/index.scss';

const wrapper = document.createElement('div');
wrapper.classList.add('pokemon-wrapper');

const header = document.createElement('h1');
header.innerText = 'Hello from Pokemons World!!!';

const picture = document.createElement('img');
picture.src = PokemonImg;
picture.alt = 'pokemon';
picture.classList.add('pokemon-picture');

wrapper.appendChild(picture);
wrapper.appendChild(header);

export default wrapper;
