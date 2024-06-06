//{} [] ()

const Gameboard = (function () {
    let board = [];
    const ROWS = 3;
    const COLUMNS = 3;

    let counter = 1;
    for (let i = 0; i < ROWS; i++) {
        board[i] = [];

        for (let j = 0; j < COLUMNS; j++) {
            board[i][j] = "";
        }
    }

    const getBoard = () => board;

    const setCell = function (row, col, player) {
        if (row > 2 || col > 2) {
            return "Selection out  bounds";
        } else {
            if (board[row][col] === "") {
                board[row][col] = player.getSymbol();
            } else {
                return "Cell is already taken";
            }
            checkAllWinConditions();
        }
    }

    function checkAllWinConditions() {
        if (winConditions.isFirstRowFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isSecondRowFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isThirdRowFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isFirstColumnFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isSecondColumnFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isThirdColumnFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isBottomLeftToTopRightFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isTopLeftToBottomRightFullOfX()) {
            console.log("X WINS!");
        } else if (winConditions.isFirstRowFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isFirstRowFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isSecondRowFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isThirdRowFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isFirstColumnFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isSecondColumnFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isThirdColumnFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isBottomLeftToTopRightFullOfO()) {
            console.log("O WINS!");
        } else if (winConditions.isTopLeftToBottomRightFullOfO()) {
            console.log("O WINS!");
        }
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

    return { getBoard, setCell }
})();

console.log(Gameboard.getBoard());

function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return { getName, getWins, addWin, getSymbol }
}

const playerX = createPlayer("X Player", "X");
playerX.addWin();
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
