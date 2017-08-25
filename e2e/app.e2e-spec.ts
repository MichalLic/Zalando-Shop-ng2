import { ZalandoShopNg2Page } from './app.po';

describe('zalando-shop-ng2 App', function() {
  let page: ZalandoShopNg2Page;

  beforeEach(() => {
    page = new ZalandoShopNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
