import { Ncd2Page } from './app.po';

describe('ncd2 App', () => {
  let page: Ncd2Page;

  beforeEach(() => {
    page = new Ncd2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
