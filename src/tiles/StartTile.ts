import {Tile} from "./Tile";
import Konva from "konva";
import {TILE_SIZE} from "../globals";
import {ITileType} from "../types";

export class StartTile extends Tile {
  public createRenderItem(layer: Konva.Layer) {
    const item = new Konva.Rect({
      x: this.x * TILE_SIZE + 8,
      y: this.y * TILE_SIZE + 8,
      width: TILE_SIZE - 16,
      height: TILE_SIZE - 16,
      cornerRadius: 16,
      fill: this.secondaryColor
    });

    layer.add(item);

    return item;
  }

  get type(): ITileType {
    return 'start';
  }

  onMoveCommand(x: number, y: number, movesInto?: Tile): void {
  }
}