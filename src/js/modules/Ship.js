export default class Ship {
  constructor(shipType, length, noOfHits = 0) {
    this.shipType = shipType;
    this.length = length;
    this.noOfHits = noOfHits;
  }

  hit() {
    this.noOfHits += 1;
  }

  isSunk() {
    return this.noOfHits >= this.length;
  }
}
