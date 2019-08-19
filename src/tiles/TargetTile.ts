import {Tile} from "./Tile";
import Konva from "konva";
import {TILE_SIZE} from "../globals";
import {ITileType} from "../types";

export class TargetTile extends Tile {
  protected strokeWidth = 8;

  public createRenderItem(layer: Konva.Layer) {
    const item = new Konva.Rect({
      x: this.x * TILE_SIZE + this.strokeWidth / 2 + 4,
      y: this.y * TILE_SIZE + this.strokeWidth / 2 + 4,
      width: TILE_SIZE - this.strokeWidth - 8,
      height: TILE_SIZE - this.strokeWidth - 8,
      cornerRadius: 16,
      fill: this.primaryColor,
      stroke: this.secondaryColor,
      strokeWidth: this.strokeWidth
    });

    layer.add(item);

    return item;
  }

  get type(): ITileType {
    return 'target';
  }

  onMoveCommand(x: number, y: number, movesInto?: Tile): void {
  }
}