// array of objects
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
    
    function add(item) {
        pokemonList.push(item);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
  };
})();

    let item =  {
        name: 'Pikachu',
        height: 2, 
        types:'water'
    }
pokemonRepository.add(item);  


// TASK 1.5 --- PART 2: forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height <=0.6){
    document.write('<p  class="list__item">' + pokemon.name + "<br>" + "height: " + pokemon.height + "<br>" + "types: " + pokemon.types + "<br>" + " - That's a small one </p>");
  } 
  else if (pokemon.height >0.6){
    document.write('<p  class="list__item">' + pokemon.name + "<br>" + "height: " + pokemon.height + "<br>" + "types: " + pokemon.types + "<br>" + " - Kinda big </p>");
  } 
  else {
    document.write('<p  class="list__item">' + pokemon.name + "<br>" + "height: " + pokemon.height + "<br>" + "types: " + pokemon.types + "<br>" + " - height missing </p>");
  }
  });
