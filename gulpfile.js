const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');

gulp.task('copy-bootstrap', () => {
  return gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/bootstrap'));
})

gulp.task('copy-fontawesome', () => {
  return gulp.src([
      'node_modules/font-awesome/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/font-awesome'));
})

gulp.task('copy-jquery', () => {
  return gulp.src([
      'node_modules/jquery/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/jquery'));
})

gulp.task('copy-types', () => {
  return gulp.src([
      'node_modules/typed.js/lib/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/typed.js'));
})

gulp.task('copy-img', () => {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/assets/img'));
})

gulp.task('copy', gulp.parallel([ 'copy-bootstrap', 'copy-fontawesome', 'copy-jquery', 'copy-types', 'copy-img' ]));

gulp.task('ejs', () => {
  delete require.cache[require.resolve('./content')];
  const content = require('./content');
  return gulp.src('*.html')
    .pipe(ejs(content))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})


gulp.task('sass', () => {
  return gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', () => {
  return browserSync.init({
    server: {
      baseDir: './dist'
    },
  });
});

gulp.task('default', gulp.parallel(['copy', 'sass', 'ejs']));

gulp.task('dev', gulp.parallel(['browserSync', 'sass', 'ejs'], () => {
  gulp.watch('scss/*.scss', gulp.series(['sass']));
  gulp.watch('*.html', gulp.series(['ejs']));
  gulp.watch('content.js', gulp.series(['ejs']));
}));