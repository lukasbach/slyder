import React, {useEffect} from 'react';
import {Layer, Rect, Stage} from "react-konva";
import {Campaign} from "./services/Campaign";
import UrlRoutingService from "./services/UrlRoutingService";
import {IntroScreen} from "./services/tiles/IntroScreen";

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      const url = UrlRoutingService.getCampaignUrl();
      console.log(`Loading campaign from ${url}.`)
      const c = new Campaign(url);
      await c.load();
      await (new IntroScreen()).display();
      c.loadLevel(UrlRoutingService.getLevel());
    })();
  });
  return (
    <div id={'gameroot'} />
  );
}

export default App;
