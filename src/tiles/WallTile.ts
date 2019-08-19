import {Tile} from "./Tile";
import Konva from "konva";
import {TILE_SIZE} from "../globals";
import {ITileType} from "../types";

export class WallTile extends Tile {
  public createRenderItem(layer: Konva.Layer) {
    const item = new Konva.Rect({
      x: this.x * TILE_SIZE,
      y: this.y * TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
      cornerRadius: this.getConnectedCornerRadii(true),
      fill: this.backgroundColor,
    });

    layer.add(item);

    return item;
  }

  get type(): ITileType {
    return 'wall';
  }

  onMoveCommand(x: number, y: number, movesInto?: Tile): void {
  }
}