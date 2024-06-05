//{} [] ()

const Gameboard = (function () {
    let board = [];
    const ROWS = 3;
    const COLUMNS = 3;

    let counter = 1;
    for (let i = 0; i < ROWS; i++) {
        board[i] = [];

        for (let j = 0; j < COLUMNS; j++) {
            board[i][j] = counter;
            counter++;
        }
    }
    const getBoard = () => board;

    const setCell = function (row, col, player) {
        board[row][col] = player.getSymbol();
    }

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

/* const player1 = createPlayer("Dani", "X");
player1.addWin();
console.log({
    name : player1.getName(), 
    wins: player1.getWins(),
    symbol: player1.getSymbol()
});

const player2 = createPlayer("Luk");
player2.addWin();
player2.addWin();
console.log({
    name : player2.getName(), 
    wins: player2.getWins()
}); */

