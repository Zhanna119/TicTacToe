'use strict';

const statusDisplay = document.querySelector('.game--status');

document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""]; 

    const drawMessage = 'Game ended in a draw';
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
    const allTabs = document.querySelectorAll('.cell'); 

    statusDisplay.innerHTML = currentPlayerTurn();

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        for (let i = 0; i <= winningLines.length - 1; i++) {
            const winCondition = winningLines[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
    
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                gameActive = false;
                statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
                return;
            }
        }
        handlePlayerChange();

        if (!gameState.includes('')) {
            statusDisplay.innerHTML = 'Game ended in a draw';
            gameActive = false;
            return;
        }
    }
    
    function handleCellClick(event) {
        const clickedCellIndex = event.target.dataset.cellIndex;     
        
        gameCheck(clickedCellIndex);
    }

    const gameCheck = function(clickedCellIndex) {
        if (!gameActive || gameState[clickedCellIndex] !=="") {
            return false;
        } 
        gameState[clickedCellIndex] = currentPlayer;
        allTabs[clickedCellIndex].textContent = currentPlayer;
        handleResultValidation();
        return;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X'; 
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    }

    function handleRestartGame() {
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
        allTabs.forEach(cell => cell.innerHTML = '');
    }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game--restart').addEventListener('click', handleRestartGame); 
})
