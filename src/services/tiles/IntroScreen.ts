import UrlRoutingService from "../UrlRoutingService";

export class IntroScreen {
  public constructor() {

  }

  public async display(): Promise<undefined> {
    return new Promise(resolve => {

      const container = document.getElementById('gameroot')!;

      const header = document.createElement('h1');
      const howtoText = document.createElement('p');
      const continueText = document.createElement('p');

      header.innerText = 'Slyder';
      howtoText.innerText = 'Move your character with WASD or Arrow keys. Reset the level by pressing spacebar.';
      continueText.innerText = 'Press any button to continue.';

      for (const el of [header, howtoText, continueText]) {
        container.appendChild(el);
      }

      const listener = () => {
        document.removeEventListener('keydown', listener);
        container.innerHTML = '';
        resolve();
      };

      document.addEventListener('keydown', listener);

      if (UrlRoutingService.getFlags().includes('nointro')) {
        listener();
      }
    });
  }
}