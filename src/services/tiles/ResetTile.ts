import {Tile} from "./Tile";
import Konva from "konva";
import {TILE_SIZE} from "../../globals";
import {ITileType} from "../../types";

export class ResetTile extends Tile {
  public createRenderItem(layer: Konva.Layer) {
    const item = new Konva.Group({

    });

    const bgTile = new Konva.Rect({
      x: this.x * TILE_SIZE,
      y: this.y * TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
      cornerRadius: this.getConnectedCornerRadii(),
      fill: '#eee'
    });

    item.add(bgTile);
    Konva.Image.fromURL('/skull.svg', (image: Konva.Image) => {
      image.setPosition({
        x: this.x * TILE_SIZE + TILE_SIZE / 2 - image.getWidth() / 2,
        y: this.y * TILE_SIZE + TILE_SIZE / 2 - image.getHeight() / 2,
      });
      item.add(image);
      item.draw();
    });

    layer.add(item);

    return item;
  }

  get type(): ITileType {
    return 'reset';
  }

  onMoveCommand(x: number, y: number, movesInto?: Tile): void {
  }
}