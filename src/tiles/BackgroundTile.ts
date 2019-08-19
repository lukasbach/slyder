import {Tile} from "./Tile";
import Konva from "konva";
import {TILE_SIZE} from "../globals";
import {ITileType} from "../types";

export class BackgroundTile extends Tile {
  public createRenderItem(layer: Konva.Layer) {
    const item = new Konva.Rect({
      x: this.x * TILE_SIZE,
      y: this.y * TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
      cornerRadius: 16,
      fill: '#bada55'
    });

    layer.add(item);

    return item;
  }

  get type(): ITileType {
    return 'background';
  }

  onMoveCommand(x: number, y: number, movesInto?: Tile): void {
  }
}