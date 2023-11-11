export default class Ship {
  constructor(shipType, size, isVertical = false) {
    this.shipType = shipType;
    this.size = size;
    this.isVertical = isVertical;
    this.noOfHits = 0;
  }

  hit() {
    this.noOfHits += 1;
  }

  isSunk() {
    return this.noOfHits >= this.size;
  }
}
