import { WalkypetPage } from './app.po';

describe('petman client App', () => {
  let page: WalkypetPage;

  beforeEach(() => {
    page = new WalkypetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
