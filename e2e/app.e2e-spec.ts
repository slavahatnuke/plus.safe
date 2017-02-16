import { Plus.SafePage } from './app.po';

describe('plus.safe App', function() {
  let page: Plus.SafePage;

  beforeEach(() => {
    page = new Plus.SafePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
