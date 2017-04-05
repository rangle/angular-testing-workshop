import { ExercisesPage } from './app.po';

describe('exercises App', () => {
  let page: ExercisesPage;

  beforeEach(() => {
    page = new ExercisesPage();
  });

  it('should display message saying 🌈rainbows', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('🌈rainbows');
  });
});
