//{} [] ()

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

    const setCell = function (row, col, playerSymbol) {
        board[row][col] = playerSymbol;
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


function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return { getName, getWins, addWin, getSymbol }
}



const gameController = (function () {

    const playerX = createPlayer("X Player", "X");
    console.log({
        name: playerX.getName(),
        wins: playerX.getWins(),
        symbol: playerX.getSymbol()
    });

    const playerO = createPlayer("O Player", "O");
    console.log({
        name: playerO.getName(),
        wins: playerO.getWins(),
        symbol: playerO.getSymbol()
    });

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
                boardObj.setCell(row, column, activePlayer.getSymbol());
                if (checkAllWinConditions()) {
                    boardObj.resetBoard();
                    activePlayer.addWin();
                    console.log(`Player X Wins: ${playerX.getWins()}`);
                    console.log(`Player X Wins: ${playerO.getWins()}`);
                    return `${activePlayer.getName()} Won the Game!`;
                }
                switchActivePlayer();
                console.log(boardObj.getBoard());
            } else {
                return "Cell is already taken";
            }
        }
    }

    function checkAllWinConditions() {
        return winConditions.isFirstRowFullOfX()
        || winConditions.isSecondRowFullOfX()
        || winConditions.isThirdRowFullOfX()
        || winConditions.isFirstColumnFullOfX()
        || winConditions.isSecondColumnFullOfX()
        || winConditions.isThirdColumnFullOfX()
        || winConditions.isBottomLeftToTopRightFullOfX()
        || winConditions.isTopLeftToBottomRightFullOfX()
        || winConditions.isFirstRowFullOfO()
        || winConditions.isFirstRowFullOfO()
        || winConditions.isSecondRowFullOfO()
        || winConditions.isThirdRowFullOfO()
        || winConditions.isFirstColumnFullOfO()
        || winConditions.isSecondColumnFullOfO()
        || winConditions.isThirdColumnFullOfO()
        || winConditions.isBottomLeftToTopRightFullOfO()
        || winConditions.isTopLeftToBottomRightFullOfO();

    }

    const winConditions = (function () {
        function isFirstRowFullOfX() {
            return board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X";
        }
        function isSecondRowFullOfX() {
            return board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X";
        }
        function isThirdRowFullOfX() {
            return board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X";
        }
        function isFirstColumnFullOfX() {
            return board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X";
        }
        function isSecondColumnFullOfX() {
            return board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X";
        }
        function isThirdColumnFullOfX() {
            return board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X";
        }
        function isBottomLeftToTopRightFullOfX() {
            return board[2][0] === "X" && board[1][1] === "X" && board[0][2] === "X";
        }
        function isTopLeftToBottomRightFullOfX() {
            return board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X";
        }
        function isFirstRowFullOfO() {
            return board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O";
        }
        function isSecondRowFullOfO() {
            return board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O";
        }
        function isThirdRowFullOfO() {
            return board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O";
        }
        function isFirstColumnFullOfO() {
            return board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O";
        }
        function isSecondColumnFullOfO() {
            return board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O";
        }
        function isThirdColumnFullOfO() {
            return board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O";
        }
        function isBottomLeftToTopRightFullOfO() {
            return board[2][0] === "O" && board[1][1] === "O" && board[0][2] === "O";
        }
        function isTopLeftToBottomRightFullOfO() {
            return board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O";
        }

        return {
            isFirstRowFullOfX, isSecondRowFullOfX, isThirdRowFullOfX, isFirstColumnFullOfX, isSecondColumnFullOfX, isThirdColumnFullOfX,
            isBottomLeftToTopRightFullOfX, isTopLeftToBottomRightFullOfX, isFirstRowFullOfO, isSecondRowFullOfO, isThirdRowFullOfO,
            isFirstColumnFullOfO, isSecondColumnFullOfO, isThirdColumnFullOfO, isBottomLeftToTopRightFullOfO, isTopLeftToBottomRightFullOfO
        }
    })();


    return { playRound }
})();
