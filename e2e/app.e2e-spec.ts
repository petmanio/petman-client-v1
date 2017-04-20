import { PetmanClientPage } from './app.po';

describe('petman-client App', () => {
  let page: PetmanClientPage;

  beforeEach(() => {
    page = new PetmanClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
