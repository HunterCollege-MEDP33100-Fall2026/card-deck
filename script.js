

//Secton 1: this gets my data from poke.json
async function getPokemonData() {
    //1a: fetches the file
    const response = await fetch('poke.json');

    //1b: converts the Json text into javascript objects
    const data = await response.json();
    console.log(data);

    //1c: Json wrapped
    const pokemonData = data.pokemon;

    //1d: Loop through every pokemon in the array
    for (let i = 0; i < pokemonData.length; i++) {
        const p = new PokemonCard(
            pokemonData[i].name,
            pokemonData[i].type,
            pokemonData[i].hp,
            pokemonData[i].bestMove,
            pokemonData[i].image,
        );
        p.updateCard();
    }
}

// Runs the function
getPokemonData();

//Section 2: pokemoncard class
class PokemonCard {
    //constructor part runs once for every card. Builds the html structure for one card.
    constructor(name, type, hp, bestMove, image) {
        //Stores the pokemons data on the object
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.bestMove = bestMove;
        this.image = image;

        //outer card
        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('card');

        //front face 
        this.front = document.createElement('div');
        this.front.classList.add('card-face', 'card-front');


//create the image element for card
        this.imageElement = document.createElement('img');
        this.imageElement.src = this.image;
        this.imageElement.alt = this.name;

        //create text elements
        this.nameElement = document.createElement('h2');
        this.typeElement = document.createElement('p');
        this.hpElement = document.createElement('p');
        this.moveElement = document.createElement('p');

//puts everything into my front face
        this.front.appendChild(this.imageElement);
        this.front.appendChild(this.nameElement);
        this.front.appendChild(this.typeElement);
        this.front.appendChild(this.hpElement);
        this.front.appendChild(this.moveElement);







        //creates the back face
        this.back = document.createElement('div');
        this.back.classList.add('card-face', 'card-back');

        const backLabel = document.createElement('p');
        backLabel.innerText = 'Pokemon';
        this.back.appendChild(backLabel);

        //attaches both faces to a single card
        this.cardElement.appendChild(this.front);
        this.cardElement.appendChild(this.back);

//adds the flip on click
        const that = this;
        this.onClick = function () {
            that.flip();

        };
        this.cardElement.addEventListener('click', this.onClick);

        document.getElementById('deck').appendChild(this.cardElement);

    }


    updateCard() {
        this.nameElement.innerText = this.name;
        this.typeElement.innerText = 'Type:' + this.type;
        this.hpElement.innerText = 'HP:' + this.hp;
        this.moveElement.innerText = 'Best move:' + this.bestMove;
    }
//flips runs when the card is clicked on
    flip() {
        this.cardElement.classList.toggle('flipped');
    }
}





