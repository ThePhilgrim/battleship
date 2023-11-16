export default class UserInterface {
  player1Container = document.querySelector('#player1');
  player2Container = document.querySelector('#player2');
  player1Board;
  player2Board;
  coordinatesResolver = null;

  constructor() {
    this.player1Board = this.createPlayerBoard(this.player1Container);
    this.player2Board = this.createPlayerBoard(this.player2Container);
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

  putShipsInYard(player, board) {
    board.shipYard.innerHTML = '';
    player.ships.forEach((ship) => {
      const shipElement = document.createElement('li');
      shipElement.classList.add('ship', ship.shipType.toLowerCase());
      shipElement.dataset.size = ship.size;
      for (let i = 1; i <= ship.size; i += 1) {
        const square = document.createElement('div');
        shipElement.appendChild(square);
      }
      board.shipYard.appendChild(shipElement);
    });
  }

  createShipYard() {
    const shipYard = document.createElement('ul');
    shipYard.classList.add('shipyard');
    return shipYard;
  }

  createPlayerBoard(playerContainer) {
    const playerTable = this.createTable('player');
    const opponentTable = this.createTable('opponent');
    const shipYard = this.createShipYard();

    playerContainer.appendChild(playerTable);
    playerContainer.appendChild(opponentTable);
    playerContainer.appendChild(shipYard);

    return { playerTable, opponentTable, shipYard };
  }
}

// For each ship -> Create div w. square x ship.size
// Allow click on any square -> Drag whole div
// Remember clicked square
// querySelector(:hover)
// Place div accordingly w. clicked square on hovered square
