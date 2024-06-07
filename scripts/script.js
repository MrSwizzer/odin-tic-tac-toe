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


function createPlayer(name, token) {
    const getName = () => name;
    const getToken = () => token;
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return { getName, getWins, addWin, getToken }
}

const gameController = (function () {

    const playerX = createPlayer("X Player", "X");
    const playerO = createPlayer("O Player", "O");

    const boardObj = gameboardObj;
    const board = boardObj.getBoard();
    let activePlayer = playerX;

    function switchActivePlayer() {
        activePlayer = (activePlayer === playerX) ? playerO : playerX;
        console.log("Switched to: " + activePlayer.getName());
    }

    function playRound(row, column) {

        if (row > 2 || column > 2) {
            return "Selection out of bounds";
        } else {
            if (board[row][column] === "") {
                boardObj.setCell(row, column, activePlayer.getToken());
                if (checkAllWinConditions(activePlayer.getToken())) {
                    boardObj.resetBoard();
                    activePlayer.addWin();
                    console.log(`Player X Wins: ${playerX.getWins()}`);
                    console.log(`Player O Wins: ${playerO.getWins()}`);
                    console.log(`${activePlayer.getName()} Won the Game!`);
                    switchActivePlayer();
                    return
                }
                switchActivePlayer();
                console.log(boardObj.getBoard());
            } else {
                return "Cell is already taken";
            }
        }
    }

    function checkAllWinConditions(token) {
        return winConditions.isFirstRowFull(token)
            || winConditions.isSecondRowFull(token)
            || winConditions.isThirdRowFull(token)
            || winConditions.isFirstColumnFull(token)
            || winConditions.isSecondColumnFull(token)
            || winConditions.isThirdColumnFull(token)
            || winConditions.isBottomLeftToTopRightFull(token)
            || winConditions.isTopLeftToBottomRightFull(token);
    }

    const winConditions = (function () {
        function isFirstRowFull(token) {
            return board[0][0] === token && board[0][1] === token && board[0][2] === token;
        }
        function isSecondRowFull(token) {
            return board[1][0] === token && board[1][1] === token && board[1][2] === token;
        }
        function isThirdRowFull(token) {
            return board[2][0] === token && board[2][1] === token && board[2][2] === token;
        }
        function isFirstColumnFull(token) {
            return board[0][0] === token && board[1][0] === token && board[2][0] === token;
        }
        function isSecondColumnFull(token) {
            return board[0][1] === token && board[1][1] === token && board[2][1] === token;
        }
        function isThirdColumnFull(token) {
            return board[0][2] === token && board[1][2] === token && board[2][2] === token;
        }
        function isBottomLeftToTopRightFull(token) {
            return board[2][0] === token && board[1][1] === token && board[0][2] === token;
        }
        function isTopLeftToBottomRightFull(token) {
            return board[0][0] === token && board[1][1] === token && board[2][2] === token;
        }
        return {
            isFirstRowFull, isSecondRowFull, isThirdRowFull, isFirstColumnFull, isSecondColumnFull,
            isThirdColumnFull, isBottomLeftToTopRightFull, isTopLeftToBottomRightFull
        }
    })();
    return { playRound }
})();
