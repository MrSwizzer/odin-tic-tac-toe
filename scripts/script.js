const gameboardObj = (function () {
    let board = [];
    const ROWS = 3;
    const COLUMNS = 3;

    for (let i = 0; i < ROWS; i++) {
        board[i] = [];

        for (let j = 0; j < COLUMNS; j++) {
            board[i][j] = "";
        }
    }

    const getBoard = () => board;

    const setCell = function (row, col, playertoken) {
        board[row][col] = playertoken;
    }

    const resetBoard = function () {
        for (let i = 0; i < ROWS; i++) {
            board[i] = [];

            for (let j = 0; j < COLUMNS; j++) {
                board[i][j] = "";
            }
        }
    }

    return { getBoard, setCell, resetBoard }
})();


const GameController = function () {

    const boardObj = gameboardObj;
    const boardArr = boardObj.getBoard();

    function createPlayer(name, token) {
        const getName = () => name;
        const getToken = () => token;
        return { getName, getToken }
    }

    let playerOne;
    let playerTwo;
    let activePlayer

    document.addEventListener('namesSubmitted', (event) => {
        const playerOneName = event.detail.playerOne;
        const playerTwoName = event.detail.playerTwo;

        playerOne = createPlayer(playerOneName, "X");
        playerTwo = createPlayer(playerTwoName, "O");
        activePlayer = playerOne;

        console.log("Spieler X: " + playerOne.getName());
        console.log("Spieler O: " + playerTwo.getName());
    });

    function switchActivePlayer() {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    }

    const getActivePlayer = () => activePlayer;

    function playRound(row, column) {
        if (boardArr[row][column] === "") {
            boardObj.setCell(row, column, activePlayer.getToken());

            for (const method in winConditions) {
                let result = winConditions[method](activePlayer.getToken());
                if (winConditions.hasOwnProperty(method) && result) {
                    const roundWinner = activePlayer;
                    switchActivePlayer();
                    return `${roundWinner.getName()} Won the Game!`
                }
            }
            if (!boardArr.some(row => row.includes(""))) {
                return "It's a Tie"
            }
            switchActivePlayer();
        } else {
            return "Cell is already taken";
        }
    }

    function restartGame() {
        boardObj.resetBoard();
    }

    const winConditions = (function () {
        function isFirstRowFull(token) {
            return boardArr[0][0] === token && boardArr[0][1] === token && boardArr[0][2] === token;
        }
        function isSecondRowFull(token) {
            return boardArr[1][0] === token && boardArr[1][1] === token && boardArr[1][2] === token;
        }
        function isThirdRowFull(token) {
            return boardArr[2][0] === token && boardArr[2][1] === token && boardArr[2][2] === token;
        }
        function isFirstColumnFull(token) {
            return boardArr[0][0] === token && boardArr[1][0] === token && boardArr[2][0] === token;
        }
        function isSecondColumnFull(token) {
            return boardArr[0][1] === token && boardArr[1][1] === token && boardArr[2][1] === token;
        }
        function isThirdColumnFull(token) {
            return boardArr[0][2] === token && boardArr[1][2] === token && boardArr[2][2] === token;
        }
        function isBottomLeftToTopRightFull(token) {
            return boardArr[2][0] === token && boardArr[1][1] === token && boardArr[0][2] === token;
        }
        function isTopLeftToBottomRightFull(token) {
            return boardArr[0][0] === token && boardArr[1][1] === token && boardArr[2][2] === token;
        }
        return {
            isFirstRowFull, isSecondRowFull, isThirdRowFull, isFirstColumnFull, isSecondColumnFull,
            isThirdColumnFull, isBottomLeftToTopRightFull, isTopLeftToBottomRightFull
        }
    })();
    return { playRound, restartGame, getActivePlayer, getBoard: boardObj.getBoard }
};

function ScreenController() {
    const game = GameController();

    const playerTurnParagraph = document.querySelector(".player-turn");
    const infoParagraph = document.querySelector(".info");
    const boardButtons = document.querySelectorAll(".square");
    const restartButton = document.querySelector(".restart");
    const submitNamesButton = document.querySelector(".submit-names")
    const modal = document.querySelector(".modal")



    function updateScreen() {
        const boardArr = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnParagraph.textContent = `It's ${activePlayer.getName()}'s Turn`;


        let counter = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardArr[i][j] === "X") {
                    boardButtons[counter].children[1].style.display = "block";
                } else if (boardArr[i][j] === "O") {
                    boardButtons[counter].children[0].style.display = "block";
                } else {
                    boardButtons[counter].children[0].style.display = "none";
                    boardButtons[counter].children[1].style.display = "none";
                }
                counter++
            }
        }
    }


    restartButton.addEventListener("click", () => {
        game.restartGame();
        infoParagraph.textContent = "";
        updateScreen();
    })

    function clickHandler(e) {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        let info = game.playRound(row, column);
        infoParagraph.textContent = info;
        updateScreen();
    }

    boardButtons.forEach(function (button) {
        button.addEventListener("click", clickHandler);
    });

    document.addEventListener('DOMContentLoaded', () => {
        modal.showModal();
    });

    submitNamesButton.addEventListener('click', () => {
        const playerOneName = document.getElementById('playerOneInput').value;
        const playerTwoName = document.getElementById('playerTwoInput').value;

        const namesSubmittedEvent = new CustomEvent('namesSubmitted', {
            detail: { playerOne: playerOneName, playerTwo: playerTwoName }
        });
        document.dispatchEvent(namesSubmittedEvent);
        modal.close();
    });
}

ScreenController();