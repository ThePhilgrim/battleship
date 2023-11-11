export default class UserInterface {
  player1Container = document.querySelector('#player1');
  player2Container = document.querySelector('#player2');

  constructor() {
    this.createPlayerBoards(this.player1Container);
    this.createPlayerBoards(this.player2Container);
  }

  updateBoard(player, playerContainer) {}

  createPlayerBoards(playerContainer) {
    function createTable(className) {
      const table = document.createElement('table');
      table.classList.add(className);

      for (let row = 0; row < 10; row += 1) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 10; col += 1) {
          const td = document.createElement('td');
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      return table;
    }

    const playerTable = createTable('player');
    const opponentTable = createTable('opponent');

    playerContainer.appendChild(playerTable);
    playerContainer.appendChild(opponentTable);
  }
}
