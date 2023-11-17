import { DEBUG } from "./Battleships.js";

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

  // TODO: Ship moves strangely when zoomed in
  // Solution: Check DPI, calculate size of 1px (real pixels), multiply calc accordingly
  // TODO: Bug – Drag ship to opponent board -> Click rotate button
  onDragStart(event, ship) {
    if (DEBUG.MOUSE_EVENTS) console.log( 'dragstart', event );
    const square = event.target;
    const index = square.dataset.index;
    const shipElement = square.closest('.ship');

    const shipElementX = shipElement.offsetLeft;
    const shipElementY = shipElement.offsetTop;
    const initialMouseX = event.screenX;
    const initialMouseY = event.screenY;

    shipElement.classList.add('being-dragged');
    shipElement.style.left = `${shipElementX}px`;
    shipElement.style.top = `${shipElementY}px`;

    function onMouseMove(event) {
      if (DEBUG.MOUSE_EVENTS) console.log( 'mousemove', event );
      const deltaX = event.screenX - initialMouseX;
      const deltaY = event.screenY - initialMouseY;
      shipElement.style.left = `${shipElementX + deltaX}px`;
      shipElement.style.top = `${shipElementY + deltaY}px`;
    }

    function onMouseUp(event) {
      if (DEBUG.MOUSE_EVENTS) console.log( 'mouseup', event );
      shipElement.classList.remove('being-dragged');
      if (!event.target.closest('table').classList.contains('player')) {
        return;
      }
      ship.isVertical = shipElement.classList.contains('vertical');
      const targetedSquareCoordinates = { y: event.target.dataset.y * 1, x: event.target.dataset.x * 1 };

      let adjustedCoordinates;
      if (ship.isVertical) {
        adjustedCoordinates = { y: targetedSquareCoordinates.y - index, x: targetedSquareCoordinates.x };
      } else {
        adjustedCoordinates = { y: targetedSquareCoordinates.y, x: targetedSquareCoordinates.x - index };
      }

      removeEventListener('mousemove', onMouseMove);
      removeEventListener('mouseup', onMouseUp);
      ship.hasBeenPlaced(adjustedCoordinates);
    }

    addEventListener('mousemove', onMouseMove);
    addEventListener('mouseup', onMouseUp);
  }

  // onSquarePlaceShip(event) {}

  onSquareAttack(event) {
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

        td.addEventListener('mousedown', this.onSquareAttack.bind(this));

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }

  createShip(ship) {
    const shipElement = document.createElement('li');
    shipElement.classList.add('ship', ship.shipType.toLowerCase(), 'vertical');
    shipElement.dataset.size = ship.size;

    for (let i = 0; i < ship.size; i += 1) {
      const square = document.createElement('div');
      square.dataset.index = i;

      square.addEventListener('mousedown', (event) => {
        this.onDragStart(event, ship);
      });

      shipElement.appendChild(square);
    }

    return shipElement;
  }

  putShipsInYard(player, board) {
    const ships = board.shipYard.querySelector('.ships');
    ships.innerHTML = '';
    player.ships.forEach((ship) => {
      const shipElement = this.createShip(ship);
      ships.appendChild(shipElement);
    });
  }

  createShipYard() {
    const shipYard = document.createElement('div');
    shipYard.classList.add('shipyard');

    const ships = document.createElement('ul');
    ships.classList.add('ships');
    shipYard.appendChild(ships);

    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate';

    rotateButton.addEventListener('click', () => {
      const shipElements = shipYard.querySelectorAll('.ship');
      shipElements.forEach((ship) => {
        ship.classList.toggle('vertical');
        ship.classList.toggle('horizontal');
      });
    });
    shipYard.appendChild(rotateButton);
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
