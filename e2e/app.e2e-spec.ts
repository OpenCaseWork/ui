import { OpencaseworkUiPage } from './app.po';

describe('opencasework-ui App', () => {
  let page: OpencaseworkUiPage;

  beforeEach(() => {
    page = new OpencaseworkUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
