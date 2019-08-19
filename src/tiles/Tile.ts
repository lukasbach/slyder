import {ITileType} from "../types";
import Konva from "konva";
import {TILE_SIZE} from "../globals";

export abstract class Tile {
  protected strokeWidth = 0;
  private _x: number;
  private _y: number;
  private initialX: number;
  private initialY: number;
  private _getNeighbourTileTypeGetter?: (x: number, y: number) => ITileType | undefined;
  protected colors: string[];
  public renderItem!: Konva.Shape | Konva.Group; // TODO
  public layer: Konva.Layer;

  public constructor(x: number, y: number, layer: Konva.Layer, colors: string[]) {
    this._x = x;
    this._y = y;
    this.initialX = x;
    this.initialY = y;
    this.layer = layer;
    this.colors = colors;
  }

  public set neighbourTileTypeGetter(getNeighbourTileType: (x: number, y: number) => ITileType | undefined) {
    if (this._getNeighbourTileTypeGetter) {
      throw Error('Cant set getNeighbourTileType twice.');
    } else {
      this._getNeighbourTileTypeGetter = getNeighbourTileType;
    }
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  protected get primaryColor() {
    return this.colors[2];
  }

  protected get secondaryColor() {
    return this.colors[3];
  }

  protected get backgroundColor() {
    return this.colors[0];
  }

  protected get secondaryBackgroundColor() {
    return this.colors[1];
  }

  public abstract get type(): ITileType;

  public moveRelative(x: number, y: number) {
    this._x += x;
    this._y += y;
    this.tweenToCurrentLocation();
  }

  protected getNeighbourTileType(x: number, y: number) {
    if (!this._getNeighbourTileTypeGetter) {
      throw Error('getNeighbourTileType not set yet.');
    } else {
      return this._getNeighbourTileTypeGetter(x, y);
    }
  }

  public reset() {
    this._x = this.initialX;
    this._y = this.initialY;
    this.tweenToCurrentLocation();
  }

  protected tweenToCurrentLocation() {
    const tween = new Konva.Tween({
      node: this.renderItem,
      duration: .1,
      x: this.x * TILE_SIZE + this.strokeWidth / 2,
      y: this.y * TILE_SIZE + this.strokeWidth / 2,
    });
    tween.play();
  }

  protected getConnectedCornerRadii(mergeWithBorder: boolean = false, defaultRadius: number = 16) {
    const top = this.getNeighbourTileType(0, -1);
    const bottom = this.getNeighbourTileType(0, 1);
    const left = this.getNeighbourTileType(-1, 0);
    const right = this.getNeighbourTileType(1, 0);

    let [topLeft, topRight, bottomRight, bottomLeft] = [defaultRadius, defaultRadius, defaultRadius, defaultRadius];

    if ((top && top === this.type) || (mergeWithBorder && top === 'outofboard')) {
      topLeft = 0;
      topRight = 0;
    }

    if ((bottom && bottom === this.type) || (mergeWithBorder && bottom === 'outofboard')) {
      bottomLeft = 0;
      bottomRight = 0;
    }

    if ((left && left === this.type) || (mergeWithBorder && left === 'outofboard')) {
      topLeft = 0;
      bottomLeft = 0;
    }

    if ((right && right === this.type) || (mergeWithBorder && right === 'outofboard')) {
      topRight = 0;
      bottomRight = 0;
    }

    return [topLeft, topRight, bottomRight, bottomLeft];

    /*
    // No connections
    if (!top && !bottom && !left && !right) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ defaultRadius, defaultRadius, defaultRadius, defaultRadius ];
    }

    // One side connected
    else if (top && top === this.type && !bottom && !left && !right) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             defaultRadius, defaultRadius ];
    } else if (bottom && bottom === this.type && !top && !left && !right) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ defaultRadius, defaultRadius, 0,             0 ];
    } else if (left && left === this.type && !bottom && !top && !right) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             defaultRadius, defaultRadius, 0 ];
    } else if (right && right === this.type && !bottom && !left && !top) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             defaultRadius, defaultRadius ];
    }

    // Two sides connected
    else if (top && top === this.type && right && right === this.type && !left && !bottom) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             0,             defaultRadius ];
    } else if (top && top === this.type && bottom && bottom === this.type && !left && !right) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             0,             0 ];
    } else if (top && top === this.type && left && left === this.type && !right && !bottom) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             defaultRadius, 0 ];
    } else if (right && right === this.type && bottom && bottom === this.type && !left && !top) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ defaultRadius, 0,             0,             0 ];
    } else if (right && right === this.type && left && left === this.type && !top && !bottom) {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             0,             0 ];
    }

    // Three/four sides connected
    else {
      //       top-left       top-right      bottom-right   bottom-left
      return [ 0,             0,             0,             0 ];
    }*/
  }

  public abstract onMoveCommand(x: number, y: number, movesInto?: Tile): void;
  public abstract createRenderItem(layer: Konva.Layer): Konva.Shape | Konva.Group;
}