import { BOARD_DIMENSIONS } from "../constants";
import { Ball } from "./ball";
import { Cell } from "./cell";

export class Board extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._cells = [];
    this._selectedBall = null;

    this._buildBoard();
    this._makeBalls();
  }

  getRandomEmptyCell() {
    const rndI = Math.floor(Math.random() * BOARD_DIMENSIONS.width);
    const rndJ = Math.floor(Math.random() * BOARD_DIMENSIONS.height);
    const rndCell = this._cells[rndI][rndJ];

    if (!rndCell.isEmpty) {
      return this.getRandomEmptyCell();
    }

    return rndCell;
  }

  getCellByBall(ball) {
    for (let i = 0; i < this._cells.length; i++) {
      const columns = this._cells[i];
      for (let j = 0; j < columns.length; j++) {
        const cell = columns[j];
        if (cell.ball === ball) {
          return cell;
        }
      }
    }
  }

  _buildBoard() {
    for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
      const column = [];

      for (let row = 0; row < BOARD_DIMENSIONS.height; row++) {
        const cell = new Cell(this.scene, row, col);
        this.add(cell);
        column.push(cell);
        const { width, height } = cell;
        cell.setPosition(col * width + width / 2, row * height + height / 2);
        cell.on("onCellClick", this._onCellClicked, this);
      }

      this._cells.push(column);
    }
  }

  _makeBalls() {
    for (let i = 0; i < 3; i++) {
      const ball = this._generateRandomBall();
      const cell = this.getRandomEmptyCell();

      cell.addBall(ball);
    }
  }

  _generateRandomBall() {
    const type = Math.floor(Math.random() * 4 + 1);
    const ball = new Ball(this.scene, type);

    return ball;
  }

  _onCellClicked(col, row) {
    const cell = this._cells[col][row];
    const { isEmpty } = cell;

    if (isEmpty) {
      if (this._selectedBall) {
        const prevCell = this.getCellByBall(this._selectedBall);
        prevCell.removeBall();
        cell.addBall(this._selectedBall);
        this._selectedBall.deselectBall();
        this._selectedBall = null;
        this._makeBalls();
      }
    } else {
      if (this._selectedBall) {
        this._selectedBall.deselectBall();
      }
      this._selectedBall = cell.ball;
      this._selectedBall.selectBall();
    }
  }
}
