import 'config/mongoose';

describe('mongoose', () => {
  it('has a MONGO_URI', () => {
    expect(process.env.MONGO_URI).toBeDefined();
  });
});
