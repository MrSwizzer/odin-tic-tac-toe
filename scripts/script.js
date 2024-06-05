//{} [] ()

const Gameboard = (function () {
    const board = [];
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

    return {getBoard}
})();

console.log(Gameboard.getBoard());

/* function createPlayer(name) {
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    const getName = () => name;
    return {getName, getWins, addWin}
} */

const playerCreator = (function (name) {
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    const getName = () => name;
    return {getName, getWins, addWin}
})();

playerCreator("Dani").getName();

/* const player1 = createPlayer("Dani");
player1.addWin();
console.log({
    name : player1.getName(), 
    wins: player1.getWins()
});

const player2 = createPlayer("Luk");
player2.addWin();
player2.addWin();
console.log({
    name : player2.getName(), 
    wins: player2.getWins()
}); */