import './dotenv';

describe('Dotenv Config', () => {
  it('has a process.env', () => {
    expect(process.env).toBeDefined();
  });
});
