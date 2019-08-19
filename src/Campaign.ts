import {Level} from "./Level";
import UrlRoutingService from "./UrlRoutingService";

export class Campaign {
  private readonly url: string;
  private campaignName?: string;
  private author?: string;
  private website?: string;
  private levels: Level[];
  private currentLevel: number;

  public constructor(url: string) {
    this.url = url;
    this.levels = [];
    this.currentLevel = -1;
  }

  public async load() {
    const text = await this.loadTextFromUrl(this.url);
    await this.parseTextStructure(text);
  }

  public loadLevel(id: number) {
    document.getElementById('gameroot')!.innerHTML = '';
    console.log(`Loading level ${id}`, this.levels[id]);
    UrlRoutingService.setLevel('' + id);
    this.levels.forEach(l => l.unload());
    this.currentLevel = id;
    this.levels[id].load();
    this.loadFooter();
  }

  private async loadTextFromUrl(url: string): Promise<string> {
    const f = await fetch(url);
    return (await f.text())
      .replace(/\r\n/g, '\n') // Sanitize line breaks
      .replace(/\/\/[\w\W]*?\n/g, '') // Remove comments
      .replace(/\n+!level/g, '\n!level');

    // .split('\n').filter(l => l !== '').join('\n')
  }

  private async parseTextStructure(text: string) {
    console.log(text, text.split('===\n'))
    const [preamble, levelDefinitions] = text.split('===\n');

    this.parsePreamble(preamble);
    this.parseLevels(levelDefinitions);
  }

  private parseLevels(levelDefinitions: string) {
    const levels = levelDefinitions.split('!level\n');
    levels.splice(0, 1);

    for (let level of levels) {
      let colorSchemeText = this.findParameterInPreamble('color', level);

      if (!colorSchemeText) {
        colorSchemeText = '6e2142 943855 e16363 ffd692';
      }

      const colorScheme = colorSchemeText.split(' ').map(c => `#${c}`);
      const levelWithoutParameters = level.replace(/![\w\W]*?\n/g, '');
      const maps = levelWithoutParameters.split('\n\n');
      this.levels.push(
        new Level(
          colorScheme,
          maps.map(m => m.split('\n').filter(l => l !== '')),
          () => this.loadLevel(++this.currentLevel)
        )
      );
    }
  }

  private parsePreamble(preamble: string) {
    while (preamble.endsWith('=')) {
      preamble = preamble.substring(0, preamble.length - 2);
    }

    this.campaignName = this.findParameterInPreamble('name', preamble);
    this.author = this.findParameterInPreamble('author', preamble);
    this.website = this.findParameterInPreamble('website', preamble);
  }

  private findParameterInPreamble(parameterName: string, preamble: string): string | undefined {
    const result = (new RegExp(`!${parameterName} ([a-zA-Z0-9 .\-_!?]*)\n`)).exec(preamble);
    if (result && result.length > 0) {
      return result[1];
    } else {
      return undefined;
    }
  }

  private loadFooter() {
    const footer = document.createElement('p');
    document.getElementById('gameroot')!.append(footer);
    footer.className = 'footer';
    footer.innerHTML = `
      Made by <a href="https://lukasbach.com" target="_blank">Lukas Bach</a>.
      Also check out <a href="https://lukasbach.github.io/hexagonopolis/" target="_blank">Hexagonopolis</a>
      and <a href="https://devsession.js.org" target="_blank">DevSession</a>.<br />
      <a href="https://github.com/lukasbach/slyder/blob/master/level-creation.md" target="_blank">How to design your own level</a> - 
      <a href="https://github.com/lukasbach/slyder" target="_blank">GitHub Source</a>
    `;
  }


}