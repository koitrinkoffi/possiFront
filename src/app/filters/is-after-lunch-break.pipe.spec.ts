import { IsAfterLunchBreakPipe } from './is-after-lunch-break.pipe';

describe('IsAfterLunchBreakPipe', () => {
  it('create an instance', () => {
    const pipe = new IsAfterLunchBreakPipe();
    expect(pipe).toBeTruthy();
  });
});
