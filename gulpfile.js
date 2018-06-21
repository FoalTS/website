const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');

const content = require('./content');

gulp.task('copy', () => {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/bootstrap'));

  gulp.src([
      'node_modules/font-awesome/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/font-awesome'));

  gulp.src([
      'node_modules/jquery/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/jquery'));
  
  gulp.src([
      'node_modules/typed.js/lib/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/typed.js'));

  gulp.src('img/*')
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('ejs', () => {
  gulp.src('*.html')
    .pipe(ejs(content))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('default', ['copy', 'sass', 'ejs']);

gulp.task('sass', () => {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  });
});

gulp.task('dev', ['browserSync', 'sass', 'ejs'], () => {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('*.html', ['ejs']);
});