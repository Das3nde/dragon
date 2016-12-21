import angularTemplatecache from 'gulp-angular-templatecache';
import babel from 'gulp-babel';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import jade from 'gulp-jade';
import nodemon from 'gulp-nodemon';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';

gulp.task('build:server', () =>
  gulp.src('./server.js')
    .pipe(babel())
    .pipe(rename('_server.js'))
    .pipe(gulp.dest('.')),
);

gulp.task('build:libs', () =>
  gulp.src([
    './node_modules/angular/angular.js',
    './node_modules/angular-route/angular-route.js',
  ])
    .pipe(rename('libs.js'))
    .pipe(gulp.dest('./public/js')),
);

gulp.task('build:app', () =>
  browserify({
    entries: './src/app.js',
    debug: true,
    paths: './config',
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/js/')),
);

gulp.task('build:jade', () =>
  gulp.src('./src/components/**/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(rename({
      dirname: '',
    }))
    .pipe(angularTemplatecache({
      module: 'templates',
      standalone: true,
      root: 'views/',
      moduleSystem: 'ES6',
    }))
    .pipe(rename('templates.module.js'))
    .pipe(gulp.dest('./src/templates')),
);

gulp.task('nodemon', () =>
  nodemon({
    script: '_server.js',
    // watch: /* Watch Things */,
    // ignore: /* Ignore Things */,
    execMap: {
      js: 'NODE_PATH=config node --harmony',
    },
    verbose: true,
    ext: 'js html json',
    env: { NODE_ENV: 'development' },
  }),
);

gulp.task('default', gulpSequence(
  'build:server',
  'build:jade',
  'build:app',
  'nodemon',
));
