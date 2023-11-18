export default class Ship {
  constructor(shipType, size, isVertical = true) {
    this.shipType = shipType;
    this.size = size;
    this.isVertical = isVertical; //123
    this.noOfHits = 0;
    this.ownCoordinates = new Array();
    this.hasBeenPlaced;
  }

  hit() {
    this.noOfHits += 1;
  }

  isSunk() {
    return this.noOfHits >= this.size;
  }
}
