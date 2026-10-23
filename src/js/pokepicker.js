document.addEventListener('DOMContentLoaded', function() {
    getPokemon();
});

function getPokemon(params) {
    const pokemonNumber = Math.floor(Math.random() * 1025)
    pokemonNumber + 1
    updatePokemonImage(pokemonNumber)
    updatePokemonNameAndNumber(pokemonNumber)
    updatePokemonTypes(pokemonNumber)
    return pokemonNumber
}

function updatePokemonImage(pokemonNumber) {
    const generatedPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonNumber}.png`
    const pokemonImage = document.querySelector("#pokemonImage");
    pokemonImage.src = generatedPokemon;
}

function updatePokemonNameAndNumber(pokemonNumber) {
    const generatedPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`  
    const pokemonName = document.querySelector("#pokemonName");
    const pokemonNumberElement = document.querySelector("#pokemonNumber");
    fetch(generatedPokemon)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Pokémon name:', data.species.name);
            pokemonName.textContent = data.species.name;
            pokemonNumberElement.textContent = `#${data.id.toString().padStart(4, '0')}`;
        })
        .catch(error => {
            console.error('Error fetching Pokémon name:', error);
            pokemonName.textContent = 'Unknown';
            pokemonNumberElement.textContent = '#0000';
        });
}

function updatePokemonTypes(pokemonNumber) {
    const generatedPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`  
    const type1Element = document.querySelector("#type1");
    const type2Element = document.querySelector("#type2"); 
        fetch(generatedPokemon)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Pokémon types:', data.types);
            type1Element.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${data.types[0].type.url.match(/\d+/g).pop()}.png`;
            type2Element.src = data.types.length > 1 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${data.types[1].type.url.match(/\d+/g).pop()}.png` : './assets/type-0.png';
        })
        .catch(error => {
            console.error('Error fetching Pokémon types:', error);
            type1Element.textContent = 'Unknown';
            type2Element.textContent = 'Unknown';
        })
}