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


// Part 1: create a for loop that iterates over each item in pokemonList

//for (let i=0; i < pokemonList.length; i++){
//    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ", " + " types: " + pokemonList[i].types + ") " + "</br>");
//  }


// Part 3: adding a conditional for height
  for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height <0.6){
    document.write('<p  class="list__item">' + pokemonList[i].name + "<br>" + "height: " + pokemonList[i].height + "<br>" + "types: " + pokemonList[i].types + "<br>" + " - That's a small one </p>");
  } 
  else if (pokemonList[i].height <1){
    document.write('<p  class="list__item">' + pokemonList[i].name + "<br>" + "height: " + pokemonList[i].height + "<br>" + "types: " + pokemonList[i].types + "<br>" + " - Kinda medium I guess </p>");
  } 
  else {
    document.write('<p  class="list__item">' + pokemonList[i].name + "<br>" + "height: " + pokemonList[i].height + "<br>" + "types: " + pokemonList[i].types + "<br>" + " - Wow, that’s big! </p>");
  }
  }

