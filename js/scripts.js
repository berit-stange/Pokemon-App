// List of Pokemons
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

    
    // function to add new Pokemons
    function add(item) {
        if (typeof(item) === 'object'){
            if (Object.keys('name' + 'detailsUrl' in item)){
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
      button.innerText = pokemon.name;
      button.classList.add('list__item');
      listItem.appendChild(button);
      selectPokemon.appendChild(listItem);
      button.addEventListener("click", function(event) {
      showDetails(pokemon);
      });
    }


    //fetch data from the API, then add each Pokémon in the fetched data to pokemonList with the add function
    function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        // console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }    

//takes a Pokémon item as an argument
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }


  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
//        showDetails: showDetails
    };
})();


// TASK 1.7 --- 
  pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
