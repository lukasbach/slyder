import UrlRoutingService from "./services/UrlRoutingService";
import {Campaign} from "./services/Campaign";
import {IntroScreen} from "./services/tiles/IntroScreen";

declare const module: any;

const initApp = async () => {
  const url = UrlRoutingService.getCampaignUrl();
  console.log(`Loading campaign from ${url}.`);
  const c = new Campaign(url);
  await c.load();
  await (new IntroScreen()).display();
  c.loadLevel(UrlRoutingService.getLevel());
};

initApp();

if (module && module.hot) {
  module.hot.dispose(() => {
    document.getElementById('root')!.innerHTML = '<div id="gameroot"></div>';
    initApp();
  });
}