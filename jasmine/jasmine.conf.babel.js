import Jasmine from 'jasmine';

const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: 'specs',
  spec_files: [
    '**/*.spec.js',
  ],
  helpers: [],
  stopSpecOnExpectationFailure: false,
  random: false,
});

jasmine.execute();
