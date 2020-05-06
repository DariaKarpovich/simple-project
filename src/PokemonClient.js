export default class PokemonClient {
  constructor(intialUrl) {
    this.intialUrl = intialUrl;
  }

  async getList(isNext = true) {
    this.isAlreadySorted = false;
    const link = isNext ? this.next : this.back;
    const response = await fetch(link || this.intialUrl);
    const data = await response.json();
    this.pokeData = data.results;

    this.next = data.next;
    this.back = data.previous;

    this.mas = data.results.map((k) => k.name);
    return this.mas;
  }

  getDetails(name) {
    const findItem = this.pokeData.find((item) => item.name === name);
    return fetch(findItem.url)
      .then((response) => response.json())
      .then((pokemon) => {
        this.idPokemon = pokemon.id;
        return pokemon;
      });
  }

  loadComments(comments) {
    const commentsPokemon = [];

    comments.forEach((item) => {
      if (this.idPokemon === item.idPokemons) commentsPokemon.push(item);
    });
    return commentsPokemon;
  }

  sort() {
    if (this.isAlreadySorted) {
      this.mas.reverse();
    } else {
      this.mas.sort();
      this.isAlreadySorted = true;
    }
    return this.mas;
  }

  search(inputValue) {
    const resultsSearch = this.mas.filter((i) => i.includes(inputValue));
    return resultsSearch;
  }
}
