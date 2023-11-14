export default class UserInterface {
  player1Container = document.querySelector('#player1');
  player2Container = document.querySelector('#player2');
  player1Tables;
  player2Tables;
  coordinatesResolver = null;

  constructor() {
    this.player1Tables = this.createPlayerBoards(this.player1Container);
    this.player2Tables = this.createPlayerBoards(this.player2Container);
  }

  onSquareClick(event) {
    const coordinates = { y: event.target.dataset.y, x: event.target.dataset.x };
    if (this.coordinatesResolver !== null) {
      this.coordinatesResolver(coordinates);
      this.coordinatesResolver = null;
    }
  }

  updateSquare(table, { y, x }, classNames) {
    const selector = `tr:nth-of-type(${y + 1}) td:nth-of-type(${x + 1})`;
    const square = table.querySelector(selector);
    square.classList.add(...classNames);
  }

  createTable(className) {
    const table = document.createElement('table');
    table.classList.add(className);

    for (let row = 0; row < 10; row += 1) {
      const tr = document.createElement('tr');
      for (let col = 0; col < 10; col += 1) {
        const td = document.createElement('td');
        td.dataset.x = col;
        td.dataset.y = row;

        td.addEventListener('click', this.onSquareClick.bind(this));

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }

  createPlayerBoards(playerContainer) {
    const playerTable = this.createTable('player');
    const opponentTable = this.createTable('opponent');

    playerContainer.appendChild(playerTable);
    playerContainer.appendChild(opponentTable);

    return { playerTable, opponentTable };
  }
}
