import {Tile} from "./Tile";
import Konva from "konva";
import {TILE_SIZE} from "../globals";
import {ITileType} from "../types";

export class PlayerTile extends Tile {
  protected strokeWidth = 6;

  public createRenderItem(layer: Konva.Layer) {
    /*document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          this.moveRelative(0, -1);
          break;
        case 's':
        case 'ArrowDown':
          this.moveRelative(0, 1);
          break;
        case 'a':
        case 'ArrowLeft':
          this.moveRelative(-1, 0);
          break;
        case 'd':
        case 'ArrowRight':
          this.moveRelative(1, 0);
          break;
      }
    });*/

    const item = new Konva.Rect({
      x: this.x * TILE_SIZE + this.strokeWidth / 2,
      y: this.y * TILE_SIZE + this.strokeWidth / 2,
      width: TILE_SIZE - this.strokeWidth,
      height: TILE_SIZE - this.strokeWidth,
      cornerRadius: 16,
      fill: this.secondaryColor,
      stroke: this.primaryColor,
      strokeWidth: this.strokeWidth
    });

    layer.add(item);

    return item;
  }

  get type(): ITileType {
    return 'player';
  }

  onMoveCommand(x: number, y: number, movesInto?: Tile): void {
    console.log(x, y)
    if (movesInto) {
      if (movesInto.type !== "wall") {
        this.moveRelative(x, y);
      }

      if (movesInto.type === 'reset') {
        this.reset();
      }
    } else {
      this.moveRelative(x, y);
    }
  }
}