
        undsSpan.textContent = aiFunds;
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

// Note: This implementation is simplified and may need further adjustments to fully match the game's rules.
