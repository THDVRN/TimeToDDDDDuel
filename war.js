//Creating a class to use as a blueprint to create each card
class Card {
    // Cards have suits and ranks. Values are given to the ranks, so face cards and aces have a numerical value
    constructor(rank, suit, value) {
        this.rank = rank;
        this.suit = suit;
        this.value= value;
    };
};

// Creating a class to construct a deck
class Deck {
    constructor() {
        // Deck will be made up of an array of cards
        this._cards = [];

    };

    // Constructs the deck by populating it with cards, shuffling those cards, and adding it to the array
    buildDeck() {
        this._populate();
        this._shuffle();
        return this._cards;
    };

    // Populates the deck by looping through the suits and ranks to create cards
    _populate() {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this._cards.push(new Card(ranks[j], suits[i], values[j]));
            };
        };
    };

    // Loops the the cards array and reorders it
    _shuffle() {
        if (this._cards.length > 0) {
            const shuffledDeck = this._cards.sort(() => Math.random() - 0.5)
            this._cards = [...shuffledDeck];
        };
    };
};

// Player class will require a name input and comprise of name, score, and an array for the deck
class Player {
    constructor(name) {
        this._playerName = name;
        this._playerScore = 0;
        this._playerDeck = [];
    };

    // Will pull the player name from the dealer players array
    get name() {
        return this._playerName
    };

    // Will retrieve player score from the game
    get score() {
        return this._playerScore
    };

    // Will retrieve player deck from the game
    get deck() {
        return this._playerDeck
    };

    // Will allow the game to set a new deck for the player
    set deck(newDeck) {
        if (Array.isArray(newDeck)) {
            this._playerDeck = newDeck;
        };
    };

    // Will allow the game to update the player score
    set score(newScore) {
        if (!isNaN(newScore)) {
            this._playerScore = newScore;
        };
    };
};

// Shadow Duel class will be comprised of an array for players and an array for the main deck
class ShadowDuel {
    constructor() {
        this._players = [];
        this._deck = [];
    };

    // Start function will prompt to exit or start the game
    start() {
        console.log('Welcome to the Shadow Realm');
        let input = prompt('0 - Leave \n1 - Start Shadow Duel');
            while (input != 0) {
                switch (input) {
                    case '0':
                        exit;
                    case '1':
                        this._createGame();
                        break;
                };
            input = prompt('0 - Leave \n1 - Start Shadow Duel');
            };
    };

    // Create game will create new players, build a deck, split that deck between players, and run through the turns
    _createGame() {
        
        this._players[0] = new Player('Yugi Muto');
        this._players[1] = new Player('Seto Kaiba');

        const cards = new Deck().buildDeck();

        this._players[0].deck = [...cards.slice(0, 26)];
        this._players[1].deck = [...cards.slice(26, 52)];

        console.log(`It's time to DUEL!!!`);

        for (let i = 0; i < this._players[0].deck.length; i++) {
            if (this._players[0].deck[i].value > this._players[1].deck[i].value) {
                this._players[0].score +=1;
                let winningHand = `${this._players[0].deck[i].rank} of ${this._players[0].deck[i].suit}`;
                console.log(`${this._players[0].name} played ${winningHand} and dealt damage to ${this._players[1].name}'s life points!`);
            } else if (this._players[0].deck[i].value < this._players[1].deck[i].value) {
                    this._players[1].score +=1;
                    let winningHand = `${this._players[1].deck[i].rank} of ${this._players[1].deck[i].suit}`;
                    console.log(`${this._players[1].name} played ${winningHand} and dealt damage to ${this._players[0].name}'s life points!`);
            } else {
                console.log("The players' attacks have cancelled each other out!");
            };
        };

        console.log("The Shadow Duel has ended!!!");
        if (this._players[0].score > this._players[1].score) {
            console.log(`${this._players[0].name} has won!`);
            console.log(`${this._players[0].name} has dealt ${this._players[0].score} points of damage and sent ${this._players[1].name} to the Shadow Realm!`);
            console.log(`${this._players[1].name}: No! How could I lose?!`);
            console.log(`${this._players[0].name}: Your hatred and lust for power will never prevail!`);
        } else if (this._players[0].score < this._players[1].score) {
            console.log(`${this._players[1].name} has won!`);
            console.log(`${this._players[1].name} has dealt ${this._players[1].score} points of damage and sent ${this._players[0].name} to the Shadow Realm!`);
            console.log(`${this._players[0].name}: I-I couldn't do it...`);
            console.log(`${this._players[1].name}: You showed weakness at the end...`);
            console.log(`${this._players[1].name}: I won, ${this._players[0].name}`);
        } else {
            console.log(`Both players have tied and have banished to the Shadow Realm`);
        };
    };
};

const game = new ShadowDuel();
game.start();