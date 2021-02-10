// array of objects
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


// TASK 1.5 --- PART 1: forEach loop
pokemonList.forEach(function(pokemon) {
    if (pokemon.height <0.5){
    document.write('<p  class="list__item">' + pokemon.name + "<br>" + "height: " + pokemon.height + "<br>" + "types: " + pokemon.types + "<br>" + " - That's a small one </p>");
  } 
  else if (pokemon.height <0.6){
    document.write('<p  class="list__item">' + pokemon.name + "<br>" + "height: " + pokemon.height + "<br>" + "types: " + pokemon.types + "<br>" + " - Kinda medium I guess </p>");
  } 
  else {
    document.write('<p  class="list__item">' + pokemon.name + "<br>" + "height: " + pokemon.height + "<br>" + "types: " + pokemon.types + "<br>" + " - Wow, that’s big! </p>");
  }
  })
