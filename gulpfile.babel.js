import angularTemplatecache from 'gulp-angular-templatecache';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import jade from 'gulp-jade';
import nodemon from 'gulp-nodemon';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';

const jsExecMap = 'NODE_PATH=local_modules node -r ./dotenv.js';

/**
 * gulp build:css
 *
 * Transpile scss and bundle it into one
 * styles.css in public directory
 */

gulp.task('build:css', () => gulp.src('./src/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./public'),
));


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
 * gulp build:app
 *
 * Compile all files in the src directory into one
 * single page application using babelify
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
 * gulp watch:scss
 *
 * Watch for changes to scss files in the src directory
 * and trigger the build:css task if necessary
 */

gulp.task('watch:scss', () => {
  gulp.watch('./src/**/*.scss', ['build:css']);
});


/**
 * gulp watch:jade
 *
 * Watch for changes to jade files in the src directory
 * and trigger the build:jade task if necessary (also
 * rebuild the app)
 */

gulp.task('watch:jade', () => {
  gulp.watch('./src/**/*.jade', ['build:jade', 'build:app']);
});


/**
 * gulp nodemon
 *
 * Run a nodemon server (for local development)
 */

gulp.task('nodemon', () =>
  nodemon({
    script: 'server.js',
    /*
    watch: [
      '!src/*',
    ],
    */
    ignore: [
      'src/*',
      'public/*',
    ],
    execMap: {
      js: jsExecMap,
    },
    verbose: true,
    ext: 'js html json jade',
    env: { NODE_ENV: 'development' },
  }),
);


/**
 * gulp build
 *
 * Compile angular templates and then build the angular application.
 */

gulp.task('build', gulpSequence('build:css', 'build:jade', 'build:app'));


/**
 * gulp watch
 *
 * Trigger all Watch tasks for development
 */

gulp.task('watch', ['watch:scss', 'watch:jade']);


/**
 * gulp
 *
 * Default task - build angular app and run the nodemon server
 */

gulp.task('default', gulpSequence(
  'build',
  'watch',
  'nodemon',
));
