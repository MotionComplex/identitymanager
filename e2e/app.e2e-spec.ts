import { IdentitymanagerPage } from './app.po';

describe('identitymanager App', function() {
  let page: IdentitymanagerPage;

  beforeEach(() => {
    page = new IdentitymanagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
