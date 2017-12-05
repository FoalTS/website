const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('copy', () => {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('assets/3p/bootstrap'));

  gulp.src([
      'node_modules/jquery/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('assets/3p/jquery'));
  
  gulp.src([
      'node_modules/typed.js/lib/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('assets/3p/typed.js'));

  gulp.src('img/*')
    .pipe(gulp.dest('assets/img'));
});

gulp.task('default', ['copy', 'sass']);

gulp.task('sass', () => {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: ''
    },
  });
});

gulp.task('dev', ['browserSync', 'sass'], () => {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
});