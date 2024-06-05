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

