document.addEventListener('DOMContentLoaded', () => {
    let playerFunds = 0;
    let aiFunds = 1000;
    let pot = 0;
    let gameLog = [];

    const startingFundsInput = document.getElementById('startingFunds');
    const betAmountInput = document.getElementById('betAmount');
    const playerRollSpan = document.getElementById('playerRoll');
    const aiRollSpan = document.getElementById('aiRoll');
    const roundResultSpan = document.getElementById('roundResult');
    const playerFundsSpan = document.getElementById('playerFunds');
    const aiFundsSpan = document.getElementById('aiFunds');
    const potTotalSpan = document.getElementById('potTotal');
    const gameLogDiv = document.getElementById('gameLog');

    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('rollDice').addEventListener('click', playRound);
    document.getElementById('placeBet').addEventListener('click', placeBet);
    document.getElementById('recap').addEventListener('click', showRecap);
	
	}); // Closing the DOMContentLoaded event listener

    function startGame() {
    playerFunds = parseInt(startingFundsInput.value, 10);
    if (isNaN(playerFunds) || playerFunds <= 0) {
        alert("Please enter a valid starting fund amount.");
        return;
    }
    updateFundsDisplay();
    log("Game started with $" + playerFunds + " funds. Place your bet.");
}

    function playRound() {
        const playerRoll = rollDice();
        const aiRoll = rollDice();
        playerRollSpan.textContent = playerRoll.join(", ");
        aiRollSpan.textContent = aiRoll.join(", ");
        const result = determineRoundOutcome(playerRoll, aiRoll);
        roundResultSpan.textContent = result.message;
        updateFunds(result.winner);
        disableDiceRoll(); // Disable the roll dice button after playing the round
    }



// Disabling the dice roll button until the next bet
function disableDiceRoll() {
const rollDiceButton = document.getElementById('rollDice');
rollDiceButton.disabled = true;
}

// Ensure all functions are closed and the script ends properly


    function placeBet() {
        const bet = parseInt(betAmountInput.value, 10);
        if (isNaN(bet) || bet <= 0 || bet > playerFunds) {
            alert("Invalid bet amount.");
            return;
        }
        pot += bet * 2; // Both player and AI contribute to the pot
        playerFunds -= bet;
        aiFunds -= bet; // Assuming AI always matches the player's bet
        updateFundsDisplay();
        log(`Bet of $${bet} placed. Total pot is $${pot}.`);
        enableDiceRoll();
    }

    function rollDice() {
        return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
    }

    function determineRoundOutcome(playerRoll, aiRoll) {
    // Convert rolls to strings for easier comparison
    const playerRollStr = playerRoll.sort().join('');
    const aiRollStr = aiRoll.sort().join('');

    // Define special rolls
    const instantWin = '456';
    const instantLose = '123';

    // Check for instant win/lose scenarios
    if (playerRollStr === instantWin || aiRollStr === instantLose) {
        return { winner: 'player', message: 'Player wins with an instant win!' };
} else if (aiRollStr === instantWin || playerRollStr === instantLose) {
return { winner: 'ai', message: 'AI wins with an instant win!' };
}
// Check for triples and compare
if (isTriple(playerRoll) && isTriple(aiRoll)) {
    return compareTriples(playerRoll, aiRoll);
} else if (isTriple(playerRoll)) {
    return { winner: 'player', message: 'Player wins with triples!' };
} else if (isTriple(aiRoll)) {
    return { winner: 'ai', message: 'AI wins with triples!' };
}

// Check for pairs with an odd die
if (hasPairWithOdd(playerRoll) && hasPairWithOdd(aiRoll)) {
    return compareOddDie(playerRoll, aiRoll);
} else if (hasPairWithOdd(playerRoll)) {
    return { winner: 'player', message: 'Player wins with a pair and odd die!' };
} else if (hasPairWithOdd(aiRoll)) {
    return { winner: 'ai', message: 'AI wins with a pair and odd die!' };
}

// Compare highest single die value
return compareHighestDie(playerRoll, aiRoll);

}

function isTriple(roll) {
return new Set(roll).size === 1;
}

function compareTriples(playerRoll, aiRoll) {
if (playerRoll[0] > aiRoll[0]) {
return { winner: 'player', message: 'Player wins with higher triples!' };
} else if (playerRoll[0] < aiRoll[0]) {
return { winner: 'ai', message: 'AI wins with higher triples!' };
} else {
return { winner: null, message: 'Draw with equal triples!' };
}
}

function hasPairWithOdd(roll) {
let counts = {};
roll.forEach(num => counts[num] = (counts[num] || 0) + 1);
return Object.values(counts).includes(2);
}

function compareOddDie(playerRoll, aiRoll) {
let playerOddDie = getOddDie(playerRoll);
let aiOddDie = getOddDie(aiRoll);
if (playerOddDie > aiOddDie) {
return { winner: 'player', message: 'Player wins with a higher odd die!' };
} else if (playerOddDie < aiOddDie) {
return { winner: 'ai', message: 'AI wins with a higher odd die!' };
} else {
return { winner: null, message: 'Draw with equal odd die!' };
}
}

function getOddDie(roll) {
let counts = {};
roll.forEach(num => counts[num] = (counts[num] || 0) + 1);
for (let num in counts) {
if (counts[num] === 1) {
return parseInt(num, 10);
}
}
return null; // Should not reach here if the roll has a pair and an odd die
}

function compareHighestDie(playerRoll, aiRoll) {
let playerHighest = Math.max(...playerRoll);
let aiHighest = Math.max(...aiRoll);
if (playerHighest > aiHighest) {
return { winner: 'player', message: 'Player wins with the highest single die!' };
} else if (playerHighest < aiHighest) {
return { winner: 'ai', message: 'AI wins with the highest single die!' };
} else {
return { winner: null, message: 'Draw with equal highest single die!' };
}
}
}
						  

function updateFunds(winner) {
        if (winner === 'player') {
            playerFunds += pot;
        } else if (winner === 'ai') {
            aiFunds += pot;
        }
        pot = 0;
        updateFundsDisplay();}

function updateFundsDisplay() {
    playerFundsSpan.textContent = playerFunds;
    aiFundsSpan.textContent = aiFunds;
    potTotalSpan.textContent = pot;
}

function showRecap() {
    alert(gameLog.join('\\n'));
}

function log(message) {
    gameLog.push(message);
    gameLogDiv.textContent = gameLog.join('\\n');
}

function enableDiceRoll() {
    const rollDiceButton = document.getElementById('rollDice');
    rollDiceButton.disabled = false;
}

function disableDiceRoll() {
    const rollDiceButton = document.getElementById('rollDice');
    rollDiceButton.disabled = true;
}
});
}

function updateFundsDisplay() {
    playerFundsSpan.textContent = playerFunds;
    aiFundsSpan.textContent = aiFunds;
    potTotalSpan.textContent = pot;
}

function showRecap() {
    alert(gameLog.join('\\n'));
}

function log(message) {
    gameLog.push(message);
    gameLogDiv.textContent = gameLog.join('\\n');
}

function enableDiceRoll() {
    const rollDiceButton = document.getElementById('rollDice');
    rollDiceButton.disabled = false;
}



    