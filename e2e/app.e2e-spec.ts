import { PetmanPage } from './app.po';

describe('petman client App', () => {
  let page: PetmanPage;

  beforeEach(() => {
    page = new PetmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
