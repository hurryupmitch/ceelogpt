
        roundResultSpan.textContent = roundResult;
        log(roundResult);
    }

    function placeBet() {
        const bet = parseInt(betAmountInput.value) || 0;
        if (bet <= 0 || bet > playerFunds) {
            alert("Invalid bet amount.");
            return;
        }
        pot += bet * 2; // Both player and AI contribute to the pot
        playerFunds -= bet;
        aiFunds -= bet; // Assuming AI always matches the player's bet
        updateFundsDisplay();
        log(`Bet placed: $${bet}. Total pot is now $${pot}.`);
    }

    function updateFundsDisplay() {
        playerFundsSpan.textContent = playerFunds;
        aiFundsSpan.textContent = aiFunds;
        potTotalSpan.textContent = pot;
    }

    function showRecap() {
        alert(gameLog.join('\n'));
    }

    function log(message) {
        gameLog.push(message);
        gameLogDiv.textContent = gameLog.join('\n');
    }
});

// Note: This implementation is simplified and may need adjustments to fully match the game's rules.
