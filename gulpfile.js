const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const ext_replace = require('gulp-ext-replace');
const header = require('gulp-header');
const footer = require('gulp-footer');

gulp.task('markdown-to-html', () => {
  gulp.src('docs/**/*.md')
    .pipe(header('${content}', { content: '<%- include(\'../partials/doc-top.html\') %>' }))
    .pipe(footer('${content}', { content: '<%- include(\'../partials/doc-bottom.html\') %>' }))
    .pipe(ext_replace('.html'))
    .pipe(gulp.dest('templates/pages'))
})

gulp.task('copy', () => {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('dist/assets/3p/bootstrap'));

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

gulp.task('sass', () => {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html', ['markdown-to-html'], () => {
  gulp.src('templates/pages/**/*.html')
    .pipe(ejs({}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build', ['copy', 'sass', 'html']);

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  });
});

gulp.task('dev', ['browserSync', 'build'], () => {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('docs/**/*.md', ['markdown-to-html']);
  gulp.watch('templates/**/*.html', ['html']);
});