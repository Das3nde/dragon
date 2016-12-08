import babel from 'gulp-babel';
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import nodemon from 'gulp-nodemon';

gulp.task('build:server', () => {
  return gulp.src('./server.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', () => {
  return nodemon({
    script: 'dist/server.js',
    // watch: /* Watch Things */,
    // ignore: /* Ignore Things */,
    execMap: {
      js: 'node --harmony',
    },
    verbose: true,
    ext: 'js html json',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', gulpSequence(
  'build:server',
  'nodemon'
));
