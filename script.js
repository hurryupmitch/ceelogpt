
document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGame');
    const rollDiceBtn = document.getElementById('rollDice');
    const placeBetBtn = document.getElementById('placeBet');
    const recapBtn = document.getElementById('recap');
    const diceSpans = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3')];
    const playerFundsSpan = document.getElementById('playerFunds');
    const aiFundsSpan = document.getElementById('aiFunds');
    const logList = document.getElementById('logList');
    const startingAmountInput = document.getElementById('startingAmount');
    const betAmountInput = document.getElementById('betAmount');

    let playerFunds = 0;
    let aiFunds = 1000; // AI's starting funds
    let currentPot = 0;
    let gameStarted = false;
    let gameLog = [];

    startGameBtn.addEventListener('click', () => {
        playerFunds = parseInt(startingAmountInput.value);
        if (isNaN(playerFunds) || playerFunds <= 0) {
            alert('Please enter a valid starting amount.');
            return;
        }
        gameStarted = true;
        updateFundsDisplay();
        logGameEvent('Game started with $' + playerFunds + ' as starting funds.');
    });

    rollDiceBtn.addEventListener('click', () => {
        if (!gameStarted) {
            alert('Please start the game first.');
            return;
        }

        let diceRolls = rollDice();
        let result = determineOutcome(diceRolls);
        processRoundResult(result, diceRolls);
        updateFundsDisplay();
    });

    placeBetBtn.addEventListener('click', () => {
        if (!gameStarted) {
            alert('Please start the game first.');
            return;
        }

        let betAmount = parseInt(betAmountInput.value);
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > playerFunds) {
            alert('Please enter a valid bet amount.');
            return;
        }

        currentPot += betAmount * 2; // Both players match the bet
        playerFunds -= betAmount;
        aiFunds -= betAmount;
        updateFundsDisplay();
        logGameEvent('Bet placed: $' + betAmount + '. Total pot: $' + currentPot + '.');
    });

    recapBtn.addEventListener('click', () => {
        showRecap();
    });

    function rollDice() {
        return [1, 2, 3].map(() => Math.floor(Math.random() * 6) + 1);
    }

    function determineOutcome(diceRolls) {
        // Game logic to determine the outcome based on dice rolls
        // This function should return an object indicating the result and the winner (if any)
        // Example: { result: 'win', winner: 'player' }
        return {}; // Placeholder for actual game logic
    }

    function processRoundResult(result, diceRolls) {
        // Process the round result and update the funds and pot accordingly
        // Update the game log as well
        // Placeholder for actual implementation
    }

    function updateFundsDisplay() {
        playerFundsSpan.textContent = playerFunds;
        aiFundsSpan.textContent = aiFunds;
    }

    function logGameEvent(event) {
        gameLog.push(event);
        let li = document.createElement('li');
        li.textContent = event;
        logList.appendChild(li);
    }

    function showRecap() {
        alert(gameLog.join('\n'));
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGame');
    const rollDiceBtn = document.getElementById('rollDice');
    const placeBetBtn = document.getElementById('placeBet');
    const recapBtn = document.getElementById('recap');
    const diceSpans = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3')];
    const playerFundsSpan = document.getElementById('playerFunds');
    const aiFundsSpan = document.getElementById('aiFunds');
    const logList = document.getElementById('logList');
    const startingAmountInput = document.getElementById('startingAmount');
    const betAmountInput = document.getElementById('betAmount');

    let playerFunds = 0;
    let aiFunds = 1000; // AI's starting funds
    let currentPot = 0;
    let gameStarted = false;
    let gameLog = [];

    startGameBtn.addEventListener('click', () => {
        playerFunds = parseInt(startingAmountInput.value);
        if (isNaN(playerFunds) || playerFunds <= 0) {
            alert('Please enter a valid starting amount.');
            return;
        }
        gameStarted = true;
        updateFundsDisplay();
        logGameEvent('Game started with $' + playerFunds + ' as starting funds.');
    });

    rollDiceBtn.addEventListener('click', () => {
        if (!gameStarted) {
            alert('Please start the game first.');
            return;
        }

        let diceRolls = rollDice();
        let result = determineOutcome(diceRolls);
        processRoundResult(result, diceRolls);
        updateFundsDisplay();
    });

    placeBetBtn.addEventListener('click', () => {
        if (!gameStarted) {
            alert('Please start the game first.');
            return;
        }

        let betAmount = parseInt(betAmountInput.value);
        if (isNaN(betAmount) || betAmount <= 0) {
            alert('Please enter a valid bet amount.');
            return;
        }

        // Adjust bet amount for all-in scenarios
        betAmount = Math.min(betAmount, playerFunds, aiFunds);
        currentPot += betAmount * 2; // Both players match the bet
        playerFunds -= betAmount;
        aiFunds -= betAmount;
        updateFundsDisplay();
        logGameEvent('Bet placed: $' + betAmount + '. Total pot: $' + currentPot + '.');
    });

    recapBtn.addEventListener('click', () => {
        showRecap();
    });

    function rollDice() {
        return [1, 2, 3].map(() => Math.floor(Math.random() * 6) + 1);
    }

    function determineOutcome(diceRolls) {
        // Check for instant win or loss
        const sortedRolls = diceRolls.slice().sort();
        if (sortedRolls.join('') === '456') return { result: 'win', winner: 'player' };
        if (sortedRolls.join('') === '123') return { result: 'loss', winner: 'ai' };

        // Check for triples
        if (diceRolls[0] === diceRolls[1] && diceRolls[1] === diceRolls[2]) {
            return { result: 'triple', value: diceRolls[0] };
        }

        // Check for pairs with an odd die
        if (diceRolls[0] === diceRolls[1] || diceRolls[0] === diceRolls[2] || diceRolls[1] === diceRolls[2]) {
            return { result: 'pair', value: Math.max(...diceRolls) };
        }

        // Point value
        return { result: 'point', value: Math.max(...diceRolls) };
    }

    function processRoundResult(result, diceRolls) {
        // Process the round result and update the funds and pot accordingly
        // Update the game log as well
        // Placeholder for actual implementation
    }

    function updateFundsDisplay() {
        playerFundsSpan.textContent = playerFunds;
        aiFundsSpan.textContent = aiFunds;
    }

    function logGameEvent(event) {
        gameLog.push(event);
        let li = document.createElement('li');
        li.textContent = event;
        logList.appendChild(li);
    }

    function showRecap() {
        alert(gameLog.join('\n'));
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGame');
    const rollDiceBtn = document.getElementById('rollDice');
    const placeBetBtn = document.getElementById('placeBet');
    const recapBtn = document.getElementById('recap');
    const diceSpans = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3')];
    const playerFundsSpan = document.getElementById('playerFunds');
    const aiFundsSpan = document.getElementById('aiFunds');
    const logList = document.getElementById('logList');
    const startingAmountInput = document.getElementById('startingAmount');
    const betAmountInput = document.getElementById('betAmount');

    let playerFunds = 0;
    let aiFunds = 1000; // AI's starting funds
    let currentPot = 0;
    let gameStarted = false;
    let gameLog = [];

    startGameBtn.addEventListener('click', () => {
        playerFunds = parseInt(startingAmountInput.value);
        if (isNaN(playerFunds) || playerFunds <= 0) {
            alert('Please enter a valid starting amount.');
            return;
        }
        gameStarted = true;
        updateFundsDisplay();
        logGameEvent('Game started with $' + playerFunds + ' as starting funds.');
    });

    rollDiceBtn.addEventListener('click', () => {
        if (!gameStarted) {
            alert('Please start the game first.');
            return;
        }

        let diceRolls = rollDice();
        let result = determineOutcome(diceRolls);
        processRoundResult(result, diceRolls);
        updateFundsDisplay();
    });

    placeBetBtn.addEventListener('click', () => {
        if (!gameStarted) {
            alert('Please start the game first.');
            return;
        }

        let betAmount = parseInt(betAmountInput.value);
        if (isNaN(betAmount) || betAmount <= 0) {
            alert('Please enter a valid bet amount.');
            return;
        }

        // Adjust bet amount for all-in scenarios
        betAmount = Math.min(betAmount, playerFunds, aiFunds);
        currentPot += betAmount * 2; // Both players match the bet
        playerFunds -= betAmount;
        aiFunds -= betAmount;
        updateFundsDisplay();
        logGameEvent('Bet placed: $' + betAmount + '. Total pot: $' + currentPot + '.');
    });

    recapBtn.addEventListener('click', () => {
        showRecap();
    });

    function rollDice() {
        return [1, 2, 3].map(() => Math.floor(Math.random() * 6) + 1);
    }

    function determineOutcome(diceRolls) {
        // Check for instant win or loss
        const sortedRolls = diceRolls.slice().sort();
        if (sortedRolls.join('') === '456') return { result: 'win', winner: 'player' };
        if (sortedRolls.join('') === '123') return { result: 'loss', winner: 'ai' };

        // Check for triples
        if (diceRolls[0] === diceRolls[1] && diceRolls[1] === diceRolls[2]) {
            return { result: 'triple', value: diceRolls[0] };
        }

        // Check for pairs with an odd die
        if (diceRolls[0] === diceRolls[1] || diceRolls[0] === diceRolls[2] || diceRolls[1] === diceRolls[2]) {
            return { result: 'pair', value: Math.max(...diceRolls) };
        }

        // Point value
        return { result: 'point', value: Math.max(...diceRolls) };
    }

    function processRoundResult(result, diceRolls) {
        // Process the round result and update the funds and pot accordingly
        // Update the game log as well
        // Placeholder for actual implementation
    }

    function updateFundsDisplay() {
        playerFundsSpan.textContent = playerFunds;
        aiFundsSpan.textContent = aiFunds;
    }

    function logGameEvent(event) {
        gameLog.push(event);
        let li = document.createElement('li');
        li.textContent = event;
        logList.appendChild(li);
    }

    function showRecap() {
        alert(gameLog.join('\n'));
    }
});

    function processRoundResult(result, diceRolls) {
        let roundResultText = 'Dice Rolled: ' + diceRolls.join(', ') + '. ';
        let winner = '';
        let winningAmount = currentPot;

        switch (result.result) {
            case 'win':
                if (result.winner === 'player') {
                    playerFunds += currentPot;
                    roundResultText += 'You win the round! ';
                    winner = 'player';
                } else {
                    aiFunds += currentPot;
                    roundResultText += 'AI wins the round. ';
                    winner = 'ai';
                }
                break;
            case 'loss':
                if (result.winner === 'player') {
                    aiFunds += currentPot;
                    roundResultText += 'AI wins the round. ';
                    winner = 'ai';
                } else {
                    playerFunds += currentPot;
                    roundResultText += 'You win the round! ';
                    winner = 'player';
                }
                break;
            case 'triple':
                // Handle triple dice roll case
                if (result.value > 3) { // Let's assume AI wins with triples 1-3, and player wins with 4-6
                    playerFunds += currentPot;
                    winner = 'player';
                    roundResultText += 'You win with a triple! ';
                } else {
                    aiFunds += currentPot;
                    winner = 'ai';
                    roundResultText += 'AI wins with a triple. ';
                }
                break;
            case 'pair':
                // Handle pair with an odd die
                playerFunds += currentPot; // Let's assume the player always wins in this case
                winner = 'player';
                roundResultText += 'You win with a pair and an odd die! ';
                break;
            case 'point':
                // Handle point value case
                if (result.value % 2 === 0) { // Let's say even values win for the player
                    playerFunds += currentPot;
                    winner = 'player';
                    roundResultText += 'You win with a point value! ';
                } else {
                    aiFunds += currentPot;
                    winner = 'ai';
                    roundResultText += 'AI wins with a point value. ';
                }
                break;
            default:
                roundResultText += 'Round is a draw. ';
                winningAmount = 0; // No change in funds if it's a draw
                break;
        }

        currentPot = 0; // Reset the pot for the next round
        logGameEvent(roundResultText + 'Your Total: $' + playerFunds + ', AI Total: $' + aiFunds + '.');
        if (winner !== '') {
            logGameEvent(winner.toUpperCase() + ' wins $' + winningAmount + '.');
        }
    }


// Sound effects for different game events
const diceRollSound = new Audio('dice-roll.mp3');
const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');

function playSound(sound) {
    sound.play();
}

// Leaderboard implementation
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function updateLeaderboard(playerScore) {
    leaderboard.push(playerScore);
    leaderboard.sort((a, b) => b - a); // Sort in descending order
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';
    leaderboard.forEach(score => {
        const scoreElement = document.createElement('li');
        scoreElement.textContent = '$' + score;
        leaderboardElement.appendChild(scoreElement);
    });
}


// Game difficulty levels
let difficulty = 'normal'; // Default difficulty

function setDifficulty(level) {
    difficulty = level;
    // Adjust AI behavior or starting funds based on difficulty
    // Placeholder for actual implementation
}

// Example event listener for difficulty selection (to be integrated with HTML UI)
document.getElementById('difficultySelect').addEventListener('change', (event) => {
    setDifficulty(event.target.value);
});

// Game settings
let gameSettings = {
    startingFunds: 1000, // Default starting funds
    betLimits: { min: 10, max: 100 } // Default bet limits
};

function updateGameSettings(newSettings) {
    gameSettings = { ...gameSettings, ...newSettings };
    // Update game logic to reflect new settings
    // Placeholder for actual implementation
}

// Example event listeners for settings (to be integrated with HTML UI)
document.getElementById('startingFundsInput').addEventListener('change', (event) => {
    updateGameSettings({ startingFunds: parseInt(event.target.value) });
});

document.getElementById('betLimitsInput').addEventListener('change', (event) => {
    // Logic to update bet limits
    // Placeholder for actual implementation
});


// Array of available dice designs
const diceDesigns = ['design1.png', 'design2.png', 'design3.png'];
let currentDiceDesign = diceDesigns[0]; // Default design

// Function to change dice design
function changeDiceDesign(design) {
    currentDiceDesign = design;
    // Update dice images in the game
    // Placeholder for actual implementation
}

// Example event listener for dice design selection (to be integrated with HTML UI)
document.getElementById('diceDesignSelect').addEventListener('change', (event) => {
    changeDiceDesign(event.target.value);
});

// Achievements system
const achievements = {
    'WinStreak5': { achieved: false, reward: 100 },
    'HighScore5000': { achieved: false, reward: 500 }
    // More achievements can be added
};

function checkForAchievements(score) {
    // Check if any achievements are unlocked
    // Update achievements status and award rewards
    // Placeholder for actual implementation
}


// Save and Load Game State
function saveGameState() {
    const gameState = { /* game state data */ };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    if (gameState) {
        // Load the game state
        // Placeholder for actual implementation
    }
}

// In-game Currency and Shop
let playerCurrency = 1000; // Starting currency

function purchaseItem(cost) {
    if (playerCurrency >= cost) {
        playerCurrency -= cost;
        // Add item to player's inventory
        // Placeholder for actual implementation
    } else {
        alert('Not enough currency.');
    }
}

// Example function to populate shop items (to be integrated with HTML UI)
function displayShopItems() {
    // Display available items and their costs
    // Placeholder for actual implementation
}

// Accessibility Features
function enableHighContrastMode() {
    // Toggle high contrast mode
    // Placeholder for actual implementation
}

function enableTextToSpeech() {
    // Toggle text-to-speech for game events
    // Placeholder for actual implementation
}

// Background Music
const bgMusic = new Audio('background-music.mp3');

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}

// Player Statistics
let playerStats = {
    gamesPlayed: 0,
    totalWins: 0,
    // More stats can be added
};

function updatePlayerStats(stat, value) {
    playerStats[stat] = value;
    // Update stats display
    // Placeholder for actual implementation
}


// Function to save game state to cloud
function saveGameToCloud(gameState) {
    fetch('https://example-cloud-server.com/api/saveGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gameState: gameState, playerId: 'player123' })
    })
    .then(response => response.json())
    .then(data => console.log('Game saved to cloud:', data))
    .catch(error => console.error('Error saving game:', error));
}

// Function to load game state from cloud
function loadGameFromCloud(playerId) {
    fetch(`https://example-cloud-server.com/api/loadGame?playerId=${playerId}`)
    .then(response => response.json())
    .then(data => {
        // Load the game state
        // Placeholder for actual implementation
    })
    .catch(error => console.error('Error loading game:', error));
}

