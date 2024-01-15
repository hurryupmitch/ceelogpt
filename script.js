
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
    }

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
        // Placeholder for dice evaluation logic
        // Implement game-specific logic here
    return { winner: 'player', message: 'Player wins the round!' };
}

function updateFunds(winner) {
    if (winner === 'player') {
        playerFunds += pot;
    } else if (winner === 'ai') {
        aiFunds += pot;
    }
    pot = 0;
    updateFundsDisplay();
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
});
    
