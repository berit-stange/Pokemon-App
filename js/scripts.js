let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    
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
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
//      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }


  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      showModal(pokemon); // before: console.log(pokemon);
    });
    }
    
    //Modal showing details of selected Pokemon
   function showModal(pokemon) {
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + pokemon.height;

      let contentElement2 = document.createElement('p');
      contentElement2.innerText = 'Weight: ' + pokemon.weight;

//      let contentElement3 = document.createElement('p');
//      contentElement3.innerText = 'Types: ' + pokemon.types;
      // contentElement3.innerText = 'Types: ' + pokemon.types.type;
      // contentElement3.innerText = 'Types: ' + pokemon.types.type.name;
      
      let imageElement = document.querySelector('#image-container');
      let pokeImage = document.createElement('img');
      pokeImage.classList.add('modal-image');
      pokeImage.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(contentElement2);
//      modal.appendChild(contentElement3);
      modal.appendChild(pokeImage);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
    
    modalContainer.addEventListener('click', (e) => { // click on the overlay not INSIDE the modal
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    }); 
    
    

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();



  pokemonRepository.loadList().then(function() {    // TASK 1.7 - Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
