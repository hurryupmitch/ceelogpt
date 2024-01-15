
// JavaScript content for game logic
document.addEventListener('DOMContentLoaded', () => {
    let playerFunds = 0;
    let aiFunds = 1000;
    let pot = 0;
    let gameLog = [];

    const startingFundsInput = document.getElementById('startingFunds');
    const playerRollSpan = document.getElementById('playerRoll');
    const aiRollSpan = document.getElementById('aiRoll');
    const roundResultSpan = document.getElementById('roundResult');
    const playerFundsSpan = document.getElementById('playerFunds');
    const aiFundsSpan = document.getElementById('aiFunds');
    const potTotalSpan = document.getElementById('potTotal');
    const betAmountInput = document.getElementById('betAmount');

    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('rollDice').addEventListener('click', playRound);
    document.getElementById('placeBet').addEventListener('click', placeBet);
    document.getElementById('recap').addEventListener('click', showRecap);

    function startGame() {
        playerFunds = parseInt(startingFundsInput.value) || 0;
        updateFundsDisplay();
        log("Game started. Place your bet.");
    }

    function rollDice() {
        return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
    }

    function evaluateRoll(roll) {
        // Evaluate the roll based on the game's rules
        // For simplicity, just using the sum of the dice
        return roll.reduce((a, b) => a + b, 0);
    }

    function playRound() {
        const playerRoll = rollDice();
        const aiRoll = rollDice();
        const playerScore = evaluateRoll(playerRoll);
        const aiScore = evaluateRoll(aiRoll);

        playerRollSpan.textContent = playerRoll.join(', ');
        aiRollSpan.textContent = aiRoll.join(', ');

        let roundResult;
        if (playerScore > aiScore) {
            playerFunds += pot;
            roundResult = 'You win the round!';
        } else if (playerScore < aiScore) {
            aiFunds += pot;
            roundResult = 'You lose the round.';
        } else {
            roundResult = 'The round is a draw. Pot carries over.';
        }

        pot = 0;
        updateFundsDisplay();
