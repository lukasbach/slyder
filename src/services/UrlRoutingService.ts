export default class UrlRoutingService {
  public static setLevel(levelId: string, campaignId?: string) {
    const capamignIdSure = campaignId || this.getCampaign() || 'default';

    window.location.hash = `${capamignIdSure}/${levelId}!${this.getFlags().join(',')}`;
  }

  public static getCampaignUrl() {
    const campaignId = this.getCampaign()!;

    if (campaignId === 'default') {
      return './default-campaign.txt';
    } else if (campaignId.startsWith('gh/')) {
      return `https://raw.githubusercontent.com/${campaignId.slice(3)}`;
    } else if (campaignId.startsWith('gist/')) {
      return `https://gist.githubusercontent.com/${campaignId.slice(5)}`;
    } else if (campaignId.startsWith('pb/')) {
      return `https://pastebin.com/raw/${campaignId.slice(3)}`;
    } else {
      return campaignId;
    }
  }

  public static getCampaign() {
    if (window.location.hash !== '' && !!this.getPieces()[0] && this.getPieces()[0] !== '-') {
      const c = this.getPieces()[0];
      if (c.startsWith('#')) {
        return c.slice(1);
      } else {
        return c;
      }
    } else {
      return 'default';

    }
  }

  public static getLevel() {
    if (window.location.hash !== '' && !!this.getPieces()[1]) {
      return parseInt(this.getPieces()[1]);
    } else {
      return 0;
    }
  }

  private static getPieces() {
    const pieces = window.location.hash.split('!')[0].split('/');
    return [pieces.slice(0, pieces.length - 1).join('/'), pieces[pieces.length - 1]];
  }

  public static getFlags(): string[] {
    const flagPieces = window.location.hash.split('!');
    if (!flagPieces || flagPieces.length < 2) {
      return [];
    } else {
      return flagPieces[1].split(',');
    }
  }
}