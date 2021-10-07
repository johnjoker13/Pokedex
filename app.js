const pokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
    const pokemonArray = [];

    for(let i = 1; i <= 151; i += 1) {
        pokemonArray.push(fetch(pokemonUrl(i)).then(resp => resp.json()))
    }

    Promise.all(pokemonArray)
        .then(pokemons => {

            const listOfPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name);
                accumulator += 
                `<li class="card ${types[0]}">
                   <img class="card-image ${types[0]}" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
                   <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                   <p class="card-subtitle">${types.join(' | ')}</p>
                </li>
                `
                return accumulator;
            }, '');

            const ul = document.querySelector('[data-js="pokedex"]');

            ul.innerHTML = listOfPokemons;
        })
}

fetchPokemon();