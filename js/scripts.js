// List of Pokemons
let pokemonRepository = (function () {
    let pokemonList = [
      { 
        name: 'Butterfree', 
        height: 1.1, 
        types: ['grass', 'flying', 'rock'],
      },
      { 
        name: 'Jigglypuff', 
        height: 0.5, 
        types: ['poison', 'steel'],
      },
      { 
        name: 'Weedle', 
        height: 0.3, 
        types: ['fairy', 'grass', 'poison'],
      },
      { 
        name: 'Vulpix', 
        height: 0.6, 
        types: ['fairy', 'water', 'ice'],
      }
    ];
    
    
    // function to add new Pokemons
    function add(item) {
        if (typeof(item) === 'object'){
          if (Object.keys('name' + 'height' + 'types' in item)){
            pokemonList.push(item);
          }
        }
        else {
            document.write('<p  class="error"> Check: not adding (wrong data type) </p>') 
        }
    }
    
    
    // returning the List of Pokemon
    function getAll() {
        return pokemonList;
    }
    
        
    // add new Pokemon
    function addListItem(pokemon){
      let selectPokemon = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.addEventListener('click', function (event) {
          showDetails(pokemon.name);
        });
      button.innerText = pokemon.name;
      button.classList.add('list__item');
      listItem.appendChild(button);
      selectPokemon.appendChild(listItem);
    }

    
    // show Details of Pokemon when button clicked
    function showDetails(pokemon){
      console.log(pokemon); 
    }
        
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem 
    };
})();

//let item =  {
//     name: 'Pikachu',
//     height: 2, 
//     types:'water'
//    }
//pokemonRepository.add(item);  
// just checking the add function with a different syntax
pokemonRepository.add({ name: 'Pikachu', height: 5, types:['electric', 'galvanic'] }); 
pokemonRepository.add( 1 ); 


// TASK 1.6 --- Replacing document.write with new functions - now inside addListItem
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
