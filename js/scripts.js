let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=350';
  let modalHeader = document.querySelector('.modal-header');
  let modalRow = document.querySelector('.row');

  // function to add new Pokemons
  function add(item) {
    if (typeof item === 'object') {
      if (Object.keys('name' + 'detailsUrl' in item)) {
        pokemonList.push(item);
      }
    } else {
      document.write(
        '<p  class="error"> Check: not adding (wrong data type) </p>'
      );
    }
  }

  // sorting and returning the List of Pokemon
  function getAll() {
    let sortedList = pokemonList;
    sortedList.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    return sortedList;
  }

  // add new Pokemon
  function addListItem(pokemon) {
    let listOfPokemon = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'list__item');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    listItem.appendChild(button);
    listItem.classList.add('group-list-item');
    listOfPokemon.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  //fetch data from the API, then add each Pokémon in the fetched data to pokemonList with the add function
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  //takes a Pokémon item as an argument
  function loadDetails(item) {
    showLoadingSpinner();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        hideLoadingSpinner();
        return response.json();
      })
      .then(function(details) {
        // add the details to the item
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showLoadingSpinner() {
    modalHeader.innerHTML = '';
    modalRow.innerHTML = '';
    let spinner = document.createElement('div');
    modalRow.appendChild(spinner);
    spinner.classList.add('spinner-grow', 'mx-auto', 'visible');
  }

  function hideLoadingSpinner() {
    let spinner = document.querySelector('.spinner-grow');
    spinner.classList.add('invisible');
  }

  //Modal showing details of selected Pokemon
  function showModal(pokemon) {
    modalHeader.innerHTML = '';
    modalRow.innerHTML = '';

    let contentName = document.createElement('h1');
    contentName.innerText = pokemon.name;
    modalHeader.appendChild(contentName);

    let contentHeight = document.createElement('div');
    contentHeight.classList.add('col');
    contentHeight.innerHTML = '<p>Height: <br>' + pokemon.height + '</p>';
    modalRow.appendChild(contentHeight);

    let contentWeight = document.createElement('div');
    contentWeight.classList.add('col');
    contentWeight.innerHTML = '<p>Weight: <br>' + pokemon.weight + '</p>';
    modalRow.appendChild(contentWeight);

    let contentTypes = document.createElement('div');
    contentTypes.classList.add('col');
    contentTypes.innerHTML = '<p>Types: </p>';
    modalRow.appendChild(contentTypes);

    // rendering the array of types
    let typesArray = new Array();
    pokemon.types.forEach(pokemonType => {
      let typeStr = pokemonType.type.name;
      typesArray.push(typeStr);
    });
    let typeElements = new Array();
    typesArray.forEach(element3 => {
      let typeElement = document.createElement('p');
      typeElement.innerText = element3;
      typeElements.push(typeElement);
    });
    // appending types to modal:
    typeElements.forEach(contentElement3 => {
      contentTypes.appendChild(contentElement3);
    });

    let pokeImage = document.createElement('img');
    pokeImage.classList.add('col-12', 'modal-image');
    pokeImage.src = pokemon.imageUrl;
    modalRow.appendChild(pokeImage);
  }

  // Search in List of Pokemon
  let searchInput = document.querySelector('.search');
  searchInput.addEventListener('input', function() {
    let allPokemon = document.querySelectorAll('.group-list-item');
    let filterValue = searchInput.value.toUpperCase();
    allPokemon.forEach(function(item) {
      if (item.innerText.toUpperCase().indexOf(filterValue) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
    showModal: showModal,
    showLoadingSpinner: showLoadingSpinner,
    hideLoadingSpinner: hideLoadingSpinner
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
