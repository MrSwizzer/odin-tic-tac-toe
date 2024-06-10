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

    function createPlayer(name, token) {
        const getName = () => name;
        const getToken = () => token;
        return { getName, getToken }
    }

    const playerX = createPlayer("Player X", "X");
    const playerO = createPlayer("Player O", "O");

    const boardObj = gameboardObj;
    const boardArr = boardObj.getBoard();
    let activePlayer = playerX;
    let otherPlayer = playerO;
    let roundWinner;

    function switchActivePlayer() {
        activePlayer = (activePlayer === playerX) ? playerO : playerX;
        otherPlayer = (otherPlayer === playerO) ? playerX : playerO;

        console.log("Switched to: " + activePlayer.getName());
    }

    const getActivePlayer = () => activePlayer;

    function playRound(row, column) {
        if (boardArr[row][column] === "") {
            boardObj.setCell(row, column, activePlayer.getToken());
            
            for (const method in winConditions) {
                let result = winConditions[method](activePlayer.getToken());
                if (winConditions.hasOwnProperty(method) && result) {
                    boardObj.resetBoard();
                    switchActivePlayer();
                    console.log(boardObj.getBoard());
                    return `${otherPlayer.getName()} Won the Game!`
                }
            }
            switchActivePlayer();
            console.log(boardObj.getBoard());
            return `Token placed.`
        } else {
            return "Cell is already taken";
        }
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
    return { playRound, getActivePlayer, getBoard: boardObj.getBoard }
};

function ScreenController() {
    const game = GameController();

    const playerTurn = document.querySelector(".player-turn");
    const boardButtons = document.querySelectorAll(".square");


    function updateScreen() {
        const boardArr = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurn.textContent = `It's ${activePlayer.getName()}'s Turn`;


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

    boardButtons.forEach(function(button) {
        button.addEventListener("click", () => {
            const row = button.dataset.row;
            const column = button.dataset.column;
            game.playRound(row, column);
            updateScreen();
        });
    });
}