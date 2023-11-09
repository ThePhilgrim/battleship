export default class Ship {
  constructor(shipType, length, isVertical = false) {
    this.shipType = shipType;
    this.length = length;
    this.isVertical = isVertical;
    this.noOfHits = 0;
  }

  hit() {
    this.noOfHits += 1;
  }

  isSunk() {
    return this.noOfHits >= this.length;
  }
}
