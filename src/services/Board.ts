import {Tile} from "./tiles/Tile";
import {BoardStatus, ITileType} from "../types";
import Konva from "konva";
import {BackgroundTile} from "./tiles/BackgroundTile";
import {StartTile} from "./tiles/StartTile";
import {TargetTile} from "./tiles/TargetTile";
import {ResetTile} from "./tiles/ResetTile";
import {WallTile} from "./tiles/WallTile";
import {PlayerTile} from "./tiles/PlayerTile";
import {TILE_SIZE} from "../globals";

export class Board {
  private tiles: Tile[];
  private colorScheme: string[];
  private status: BoardStatus;

  private container: HTMLDivElement;
  private stage: Konva.Stage;
  private foregroundLayer: Konva.Layer;
  private backgroundLayer: Konva.Layer;

  private onChangeStatus: () => void;

  private movementListener?: (this: Document, ev: DocumentEventMap['keydown']) => any;

  public readonly width: number;
  public readonly height: number;

  public get boardStatus() {
    return this.status;
  }

  public constructor(colorScheme: string[], map: string[], onSetStatus: () => void) {
    this.status = BoardStatus.Default;
    this.colorScheme = colorScheme;
    this.tiles = [];
    this.height = map.length;
    this.width = map[0].length;
    this.onChangeStatus = onSetStatus;

    this.container = document.createElement('div');
    document.getElementById('gameroot')!.append(this.container);
    this.stage = new Konva.Stage({
      container: this.container,
      width: this.width * TILE_SIZE,
      height: this.height * TILE_SIZE,
    });
    (this.container.firstChild as HTMLCanvasElement).style.backgroundColor = this.colorScheme[1];

    this.foregroundLayer = new Konva.Layer({});
    this.backgroundLayer = new Konva.Layer({});

    this.stage.add(this.foregroundLayer);
    this.stage.add(this.backgroundLayer);

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tileType = this.getTileId(map[y].charAt(x));
        if (tileType) {
          this.tiles.push(this.createTile(x, y, tileType, this.backgroundLayer));

          if (tileType === "start") {
            this.tiles.push(this.createTile(x, y, "player", this.backgroundLayer));
          }
          // this.tiles.push(new Tile(x, y, tileType, this.backgroundLayer));
        }
      }
    }

    for (let tile of this.tiles) {
      tile.neighbourTileTypeGetter = (x, y) => {
        if (x + tile.x < 0 || y + tile.y < 0 || x + tile.x >= this.width || y + tile.y >= this.height) {
          return 'outofboard';
        }
        const foundTile = this.tiles.find(t => t.x === x + tile.x && t.y === y + tile.y);
        return foundTile ? foundTile.type : undefined;
      };
    }

    for (let tile of this.tiles) {
      tile.renderItem = tile.createRenderItem(tile.layer);
    }

    this.stage.draw();
    this.setupMovement();
  }

  public unload() {
    this.stage.remove();
    this.container.remove();
    document.removeEventListener('keydown', this.movementListener!);
  }

  private getTileId(token: string): ITileType | undefined {
    switch (token) {
      case '.':
        return undefined;
      case '*':
        return "start";
      case 'x':
        return "reset";
      case '#':
        return "wall";
      case '>':
        return "target";
      default:
        throw Error(`Unknown map token ${token}`);
    }
  }

  private createTile(x: number, y: number, type: ITileType, layer: Konva.Layer) {
    switch (type) {
      case "background":
        return new BackgroundTile(x, y, layer, this.colorScheme);
      case "start":
        return new StartTile(x, y, layer, this.colorScheme);
      case "target":
        return new TargetTile(x, y, layer, this.colorScheme);
      case "reset":
        return new ResetTile(x, y, layer, this.colorScheme);
      case "wall":
        return new WallTile(x, y, layer, this.colorScheme);
      case "player":
        return new PlayerTile(x, y, layer, this.colorScheme);
      default:
        throw Error(`Err ${type}`);
    }
  }

  private setupMovement() {
    const move = (x: number, y: number) => {
      const playerTile = this.tiles.find(tile => tile.type === 'player')!;
      const movesInto = this.tiles.find(tile => tile.x === playerTile.x + x && tile.y === playerTile.y + y);
      this.tiles.forEach(t => {
        // const movesInto = this.tiles.find(tile => tile.x === t.x + x && tile.y === t.y + y);
        t.onMoveCommand(x, y, movesInto);
      });

      if (movesInto && movesInto.type === 'target') {
        console.log('Player entered target.')
        this.status = BoardStatus.HasWon;
        this.onChangeStatus();
      } else if (!movesInto || movesInto.type !== 'wall') {
        console.log('Player is not on target.')
        this.status = BoardStatus.Default;
        this.onChangeStatus();
      }
    };

    const reset = () => {
      this.tiles.find(tile => tile.type === 'player')!.reset();
      this.status = BoardStatus.Default;
      this.onChangeStatus();
    };

    this.movementListener = e => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          move(0, -1);
          break;
        case 's':
        case 'ArrowDown':
          move(0, 1);
          break;
        case 'a':
        case 'ArrowLeft':
          move(-1, 0);
          break;
        case 'd':
        case 'ArrowRight':
          move(1, 0);
          break;
        case ' ': // Spacebar
        case 'Control':
        case 'Shift':
        case 'Alt':
          reset();
          break;
      }
    };

    document.addEventListener('keydown', this.movementListener);
  }
}