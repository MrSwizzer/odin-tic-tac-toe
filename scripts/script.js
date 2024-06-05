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

    console.log(board);

    const setCell = function (row, col, player) {
        board[row][col] = player.getSymbol();
        checkWinner();
    }

    function checkWinner() {

        if (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") {
            console.log("X WIN'S");
        } else if (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") {
            console.log("X WIN'S");
        } else if (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") {
            console.log("X WIN'S");
        }  else if (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") {
            console.log("X WIN'S");
        } else if (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") {
            console.log("X WIN'S");
        } else if (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") {
            console.log("X WIN'S");
        } else if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
            console.log("X WIN'S");
        } else if (board[2][0] === "X" && board[1][1] === "X" && board[0][2] === "X") {
            console.log("X WIN'S");
        } else if (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") {
            console.log("O WIN'S");
        } else if (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") {
            console.log("O WIN'S");
        } else if (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") {
            console.log("O WIN'S");
        }  else if (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") {
            console.log("O WIN'S");
        } else if (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") {
            console.log("O WIN'S");
        } else if (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") {
            console.log("O WIN'S");
        } else if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
            console.log("O WIN'S");
        } else if (board[2][0] === "O" && board[1][1] === "O" && board[0][2] === "O") {
            console.log("O WIN'S");
        }
    }

    return { getBoard, setCell , checkWinner}
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

/* const playerX = createPlayer("X Player", "X");
player1.addWin();
console.log({
    name : player1.getName(), 
    wins: player1.getWins(),
    symbol: player1.getSymbol()
});*/
