import Jasmine from 'jasmine';

const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: '.',
  spec_files: [
    'local_modules/**/*.spec.js',
  ],
  helpers: [],
  stopSpecOnExpectationFailure: false,
  random: false,
});

jasmine.execute();
