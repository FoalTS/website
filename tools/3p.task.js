module.exports = (gulp) => {
  gulp.task('bootstrap', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/**/*',
        '!**/*.map'
      ])
      .pipe(gulp.dest('dist/assets/3p/bootstrap'));
  });
  
  gulp.task('jquery', () => {
    return gulp.src([
        'node_modules/jquery/dist/**/*',
        '!**/*.map'
      ])
      .pipe(gulp.dest('dist/assets/3p/jquery'));
  });
  
  gulp.task('typed.js', () => {
    return gulp.src([
        'node_modules/typed.js/lib/**/*',
        '!**/*.map'
      ])
      .pipe(gulp.dest('dist/assets/3p/typed.js'));
  });
  
  gulp.task('prismjs', () => {
    return gulp.src([
        'node_modules/prismjs/prism.js',
        'node_modules/prismjs/components/prism-typescript.min.js',
        'node_modules/prismjs/plugins/toolbar/prism-toolbar.css',
        'node_modules/prismjs/plugins/toolbar/prism-toolbar.min.js',
        'node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js',
        'node_modules/prismjs/themes/*.css',
      ])
      .pipe(gulp.dest('dist/assets/3p/prismjs'));
  });
  
  gulp.task('3p', ['bootstrap', 'jquery', 'typed.js', 'prismjs']);
}
