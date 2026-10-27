document.addEventListener('DOMContentLoaded', function() {
    getPokemon();
});

let generatedPokemon = [];

function getPokemon(params) {
    const parameters = checkSettings();
    let pokemonNumber;
    console.log('Parâmetros recebidos:', parameters);

    if (parameters.mode === 'upTo') {
        pokemonNumber = Math.floor(Math.random() * parameters.generation) + 1
    }
    else if (parameters.mode === 'only') {
        console.log("modo only")
        pokemonNumber = Math.floor(Math.random() * (parameters.generation - parameters.startAt) + parseInt(parameters.startAt) + 1);
    }

    if (generatedPokemon.includes(pokemonNumber)) {
        if (generatedPokemon.length >= 1025) {
            generatedPokemon = [];
        }
        return getPokemon();
    }
    generatedPokemon.push(pokemonNumber);
    updatePokemonImage(pokemonNumber)
    updatePokemonNameAndNumber(pokemonNumber)
    updatePokemonTypes(pokemonNumber)
    return pokemonNumber
}

function checkSettings() {
    const selectedMode = document.querySelector('#modes').value;
    const generationSelect = document.querySelector('#generations');
    const selectedGeneration = generationSelect.value;
    const generationStart = generationSelect.options[generationSelect.selectedIndex].getAttribute('data-start-at');
    const parametersList = {mode: selectedMode, generation: selectedGeneration, startAt: generationStart};
    console.log('Parâmetros selecionados:', parametersList);
    return parametersList
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