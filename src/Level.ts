import {Board} from "./Board";
import {BoardStatus} from "./types";

export class Level {
  private boards: Board[];
  private colorScheme: string[];
  private maps: string[][];
  private onNextLevel: () => void;
  private nextRefreshTimeout?: any;

  public constructor(colorScheme: string[], maps: string[][], onNextLevel: () => void) {
    this.colorScheme = colorScheme;
    this.boards = [];
    this.maps = maps;
    this.onNextLevel = onNextLevel;
  }

  public load() {
    document.getElementById('root')!.style.backgroundColor = this.colorScheme[0];

    for (let map of this.maps) {
      this.boards.push(new Board(this.colorScheme, map, () => {

        if (this.nextRefreshTimeout) {
          clearTimeout(this.nextRefreshTimeout);
        }

        this.nextRefreshTimeout = setTimeout(() => {
          if (this.boards.map(b => b.boardStatus === BoardStatus.HasWon).reduce((a, b) => a && b, true)) {
            this.onNextLevel();
          }
        }, 0);
      }));
    }
  }

  public unload() {
    this.boards.forEach(b => b.unload());
    this.boards = [];
  }
}