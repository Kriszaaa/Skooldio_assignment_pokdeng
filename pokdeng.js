const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const card_type = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
const card_number = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
// Function to draw card
// Random select card type and card number
function Drawcard(used_card) {
    let type = card_type[Math.floor(Math.random() * card_type.length)];
    let number = card_number[Math.floor(Math.random() * card_number.length)];

    // If the random card is already used, random again
    while (used_card.includes(type + '-' + number)){
        type = card_type[Math.floor(Math.random() * card_type.length)];
        number = card_number[Math.floor(Math.random() * card_number.length)];
    }
    return [type, number]
}
// scoring function
function Scoring(card){
    if(card == 'Ace'){
        return 1
    }else if(card == 'Jack' || card == 'Queen' || card == 'King' || card == '10'){
        return 0
    }else{
        return parseInt(card)
    }
}

let chips = 0
// start game function
function StartGame(){
    console.log("Please put your bet");

    // store used card from both player and dealer
    used_card = []
    rl.question('', (bet) => {
        // initialize player and dealer score
        player_score = 0
        dealer_score = 0

        // player draw 2 card sequentially
        card1 = Drawcard(used_card)
        used_card.push(card1[0]+'-'+card1[1])
        card2 = Drawcard(used_card)
        used_card.push(card2[0]+'-'+card2[1])    
        player_score = Scoring(card1[1]) + Scoring(card2[1])
        console.log('You got ' + card1[0]+'-'+card1[1] + ', ' + card2[0]+'-'+card2[1])

        // dealer draw 2 card sequentially, after player
        dealer_card1 = Drawcard(used_card)
        used_card.push(dealer_card1[0]+'-'+dealer_card1[1])
        dealer_card2 = Drawcard(used_card)
        used_card.push(dealer_card2[0]+'-'+dealer_card2[1])    
        dealer_score = Scoring(dealer_card1[1]) + Scoring(dealer_card2[1])
        console.log('The dealer got '  + dealer_card1[0]+'-'+dealer_card1[1] + ', ' + dealer_card2[0]+'-'+dealer_card2[1])

        // compare the score
        if(player_score > dealer_score){
            console.log('You won!!, received ' + bet + ' chips')
            chips += parseInt(bet)
        }else if(player_score < dealer_score){
            console.log('You lost!!, lost ' + bet + ' chips')
            chips -= parseInt(bet)
        }else{
            console.log('Tie!!')
        }

        // for game replay
        rl.question('Wanna play more (Yes/No)? \n', (answer) => {
            if(answer == 'No'){
                console.log('You got total ' + chips + ' chips')
                rl.close();
            }else{
                StartGame()
            }
        });
    });
}

StartGame()
// console.log(bet)
