import babel from 'gulp-babel';
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import nodemon from 'gulp-nodemon';
import rename from 'gulp-rename';

gulp.task('build:server', () =>
  gulp.src('./server.js')
    .pipe(babel())
    .pipe(rename('_server.js'))
    .pipe(gulp.dest('.')),
);

gulp.task('nodemon', () =>
  nodemon({
    script: '_server.js',
    // watch: /* Watch Things */,
    // ignore: /* Ignore Things */,
    execMap: {
      js: 'node --harmony',
    },
    verbose: true,
    ext: 'js html json',
    env: { NODE_ENV: 'development' },
  }),
);

gulp.task('default', gulpSequence(
  'build:server',
  'nodemon',
));
