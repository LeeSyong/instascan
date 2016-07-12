var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

gulp.task('default', ['dist']);

gulp.task('dist', function () {
  return browserify('./export.js', { noParse: [require.resolve('./src/zxing')] })
    .transform(babelify, { ignore: /zxing\.js$/i, presets: ['es2015'] })
    .bundle()
    .pipe(source('instascan.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});
