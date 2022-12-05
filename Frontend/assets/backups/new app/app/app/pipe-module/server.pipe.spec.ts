import { ServerPipe } from './server.pipe';

describe('ServerPipe', () => {
  it('create an instance', () => {
    const pipe = new ServerPipe();
    expect(pipe).toBeTruthy();
  });
});
