const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const ext_replace = require('gulp-ext-replace');
const showdown = require('showdown');
const through = require('through2');
const fs = require('fs');
const replace = require('gulp-replace');

require('./tools/3p.task')(gulp);

showdown.setFlavor('github');

function gulpShowdown() {
  var converter = new showdown.Converter();

  return through.obj((file, encoding, cb) => {
    const fileText = file.contents.toString()
    const fileHtml = converter.makeHtml(fileText)
    file.contents = new Buffer(fileHtml)
    cb(null, file)
  })
}

function includeTo(template) {
  return through.obj((file, encoding, cb) => {
    const fileText = file.contents.toString()
    file.contents = new Buffer(
      template.replace('{{content}}', fileText)
    )
    cb(null, file)
  })
}

gulp.task('img', () => {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', () => {
  return gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('build-home', () => {
  return gulp.src('templates/pages/index.html')
    .pipe(ejs({}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build-doc-wrapper', () => {
  return gulp.src('templates/pages/doc-wrapper.html')
    .pipe(ejs({}))
    .pipe(gulp.dest('templates/built'));
});

gulp.task('build-docs-html', ['build-doc-wrapper'], () => {
  const template = fs.readFileSync('templates/built/doc-wrapper.html', 'utf8');
  return gulp.src('templates/contents/*.html')
    .pipe(includeTo(template))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build-docs-markdown', ['build-doc-wrapper'], () => {
  const template = fs.readFileSync('templates/built/doc-wrapper.html', 'utf8');
  return gulp.src('docs/**/*.md')
    .pipe(gulpShowdown())
    .pipe(replace(/\.md/g, '.html'))
    .pipe(ext_replace('.html'))
    .pipe(includeTo(template))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build-docs', ['build-docs-html', 'build-docs-markdown'])

gulp.task('build', ['3p', 'img', 'sass', 'build-home', 'build-docs']);

gulp.task('dev', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  });
  gulp.watch('img/*', ['img']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch([
    'docs/**/*.md',
    'templates/partials/*.html',
    'templates/pages/*.html'
  ], ['build-docs-markdown']);
  gulp.watch([
    'templates/contents/*.html',
    'templates/partials/*.html',
    'templates/pages/*.html'
  ], ['build-home', 'build-docs-html']);
});