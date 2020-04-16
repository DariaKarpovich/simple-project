import getPokemonImage from './pokeImg';

export default class View {
  static showList(mas, pokemonInfo) {
    this.cleanForm();

    for (let id = 0; id < mas.length; id += 1) {
      const div = document.createElement('div');
      div.classList.add('card');
      div.id = id;
      document.getElementById('pole').appendChild(div);
      document.getElementById(id).innerHTML = mas[id];

      const img = document.createElement('img');
      div.classList.add('image');
      img.src = getPokemonImage(mas[id]);
      document.getElementById(id).appendChild(img);

      const but = document.createElement('button');
      but.innerHTML = 'About';
      document.getElementById(id).appendChild(but);
      but.addEventListener('click', () => pokemonInfo(mas[id]));
    }
  }

  static showDetails(pokemon) {
    View.clean();

    const img = document.createElement('img');
    img.src = getPokemonImage(pokemon.name);
    document.getElementById('img').appendChild(img);

    document.getElementById('infoName').innerHTML = `<b>Name:</b> ${pokemon.name}`;
    document.getElementById('infoHe').innerHTML = `<b>Height:</b> ${pokemon.height}`;

    this.type = pokemon.types.map((k) => k.type.name);
    document.getElementById('typePokemon').innerHTML = `<b>Type:</b> ${this.type}`;

    const abiliti = pokemon.abilities.map((k) => k.ability.name);
    document.getElementById('infoAbility').innerHTML = `<b>Abilities:</b> ${abiliti}`;

    const skills = pokemon.moves.map((k) => k.move.name);
    document.getElementById('infoSkill').innerHTML = `<b>Skills:</b> ${skills[1]}`;

    for (let d = 0; d < skills.length; d += 1) {
      document.getElementById('infoSkill').innerHTML = `${document.getElementById('infoSkill').innerHTML}, ${skills[d]}`;
    }
  }

  static clean() {
    document.getElementById('infoName').innerHTML = '';
    document.getElementById('infoHe').innerHTML = '';
    document.getElementById('infoSkill').innerHTML = '';
    document.getElementById('infoAbility').innerHTML = '';
    document.getElementById('img').innerHTML = '';
  }

  static cleanForm() {
    document.getElementById('pole').innerHTML = '';
  }

  static showComments(comments) {
    const allComments = document.getElementById('comments');
    let out = '';

    comments.forEach((item) => {
      out += `<div class="comment">
      <div class="content">
        <a class="author">${item.userName}</a>
        <div class="metadata">
          <div class="date">${this.timeConvert(item.time)}</div>
        </div>
        <div class="text">${item.textComment}</div>
      </div></div>`;
    });

    allComments.innerHTML = out;
  }

  static timeConvert(time) {
    const currentTime = new Date(time);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours = currentTime.getHours();
    const min = currentTime.getMinutes();
    const sec = currentTime.getSeconds();
    const commentTime = `${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()} ${hours}:${min}:${sec}`;
    return commentTime;
  }
}
