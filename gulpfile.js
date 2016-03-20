var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('minifyCSS', function() {
    gulp.src(['css/cv.css', 'css/reset.css'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCSS({
            advanced: false
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('minifyJS', function() {
    gulp.src('js/cv.js')
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('js'));
});

gulp.task('imagemin', function() {
    gulp.src('images/*.*')
        .pipe(cache(imagemin({
            progressive: true
        })))
        .pipe(gulp.dest('images'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function() {
    gulp.start('minifyCSS', 'minifyJS', 'imagemin', 'serve');

    gulp.watch('*.html', reload);
    gulp.watch(['css/cv.css', 'css/reset.css'], ['minifyCSS', reload]);
    gulp.watch('js/cv.js', ['minifyJS', reload]);
});
