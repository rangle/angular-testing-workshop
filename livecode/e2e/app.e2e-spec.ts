import { LivecodePage } from './app.po';

describe('livecode App', () => {
  let page: LivecodePage;

  beforeEach(() => {
    page = new LivecodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
