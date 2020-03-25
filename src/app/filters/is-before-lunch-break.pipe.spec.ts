import { IsBeforeLunchBreakPipe } from './is-before-lunch-break.pipe';

describe('IsBeforeLunchBreakPipe', () => {
  it('create an instance', () => {
    const pipe = new IsBeforeLunchBreakPipe();
    expect(pipe).toBeTruthy();
  });
});
