let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    
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
      let listOfPokemon = document.querySelector('.list-group');
      let listItem = document.createElement('li');      
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn','list__item');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemonModal');
      listItem.appendChild(button);
      listItem.classList.add('group-list-item'); 
      listOfPokemon.appendChild(listItem);
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
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }


  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      showModal(pokemon); 
    });
    }
    
    //Modal showing details of selected Pokemon
   function showModal(pokemon) {
      let modalContainer = document.querySelector('#pokemonModal');

      let modalHeader = document.querySelector('.modal-header');
      let modalBody = document.querySelector('.modal-body');

      modalHeader.innerHTML = '';
      modalBody.innerHTML = '';

      let contentName = document.createElement('h1');
      contentName.innerText = pokemon.name;   
      modalHeader.appendChild(contentName);   

      let contentHeight = document.createElement('div');
      contentHeight.classList.add('col');
      contentHeight.innerHTML = '<p>Height: <br>' + pokemon.height + '</p>';
      modalBody.appendChild(contentHeight);

      let contentWeight = document.createElement('div');
      contentWeight.classList.add('col');
      contentWeight.innerHTML = '<p>Weight: <br>' + pokemon.weight + '</p>';
      modalBody.appendChild(contentWeight); 
      
      
      let contentTypes = document.createElement('div');
      contentTypes.classList.add('col');
      contentTypes.innerHTML = '<p>Types: </p>';
      modalBody.appendChild(contentTypes);
      
      // rendering the array of types
      let typesArray = new Array;
      pokemon.types.forEach((pokemonType) => {
        typeStr = pokemonType.type.name;
        typesArray.push(typeStr);
        });
      let typeElements = new Array;
      typesArray.forEach((element3) => {
        typeElement = document.createElement('p');
        typeElement.innerText =  element3;
        typeElements.push(typeElement);
      });
      // appending types to modal:
      typeElements.forEach((contentElement3) => {
        contentTypes.appendChild(contentElement3);
      });
       
      let pokeImage = document.createElement('img');
      pokeImage.classList.add('col-12','modal-image');
      pokeImage.src = pokemon.imageUrl;
      modalBody.appendChild(pokeImage);
    }

    

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        showDetails: showDetails,
        showModal: showModal
    };
})();



  pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
