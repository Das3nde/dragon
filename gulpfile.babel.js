import angularTemplatecache from 'gulp-angular-templatecache';
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


/**
 * gulp build:libs
 *
 * Compile angular and other library files into a bundle
 * that gets served with the application.
 */

gulp.task('build:libs', () =>
  gulp.src([
    './node_modules/angular/angular.js',
    './node_modules/angular-route/angular-route.js',
  ])
    .pipe(rename('libs.js'))
    .pipe(gulp.dest('./public/js')),
);


/**
 * gulp build:app
 *
 * Compile all files in the src directory into one
 * application using babelify
 */

gulp.task('build:app', () =>
  browserify({
    entries: './src/app.js',
    debug: true,
    paths: './local_modules',
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/js/')),
);


/**
 * gulp build:jade
 *
 * Transpile jade files in the src directory into html
 * and pipe to angular's template cache
 */

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


/**
 * gulp nodemon
 *
 * Run a nodemon server (for local development)
 */

gulp.task('nodemon', () =>
  nodemon({
    script: 'server.js',
    // watch: /* Watch Things */,
    // ignore: /* Ignore Things */,
    execMap: {
      js: 'NODE_PATH=local_modules node --harmony',
    },
    verbose: true,
    ext: 'js html json',
    env: { NODE_ENV: 'development' },
  }),
);


/**
 * gulp build
 *
 * Compile angular templates and build the angular application.
 * Does **NOT** build libs!
 */

gulp.task('build', gulpSequence('build:jade', 'build:app'));


/**
 * gulp
 *
 * Default task - build angular app and run the nodemon server
 */

gulp.task('default', gulpSequence(
  'build',
  'nodemon',
));
