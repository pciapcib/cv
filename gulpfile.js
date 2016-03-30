var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    minify = require('gulp-minify-css'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    sprite = require('gulp.spritesmith'),
    tinypng = require('gulp-tinypng'),
    uglify = require('gulp-uglify');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});

gulp.task('css', function() {
    gulp.src('src/font/**/*', {
            base: 'src'
        })
        .pipe(gulp.dest('dist'));

    return gulp.src('src/css/**/*.css')
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minify({
            advanced: false
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', ['sprite'], function() {
    return gulp.src('src/images/*.*')
        .pipe(cache(tinypng('F6VlfjI0wQdaCvM_gFpTTZSrjmhiY1jY')))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('src/images/background/*.*')
        .pipe(sprite({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('src/images'));

    var cssStream = spriteData.css
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minify({
            advanced: false
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('js', function() {
    gulp.src('src/js/jquery-2.2.0.min.js')
        .pipe(gulp.dest('dist/js'));

    return gulp.src('src/js/cv.js')
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
    return gulp.src('dist/*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('clear', function(done) {
    return cache.clearAll(done);
});

gulp.task('watch', function() {
    gulp.watch('*.html', reload);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/images/background/*.*', ['images']);
    gulp.watch('src/images/*.*', ['images']);
    gulp.watch('src/js/cv.js', ['js', reload]);
});

gulp.task('init', ['clean'], function() {
    gulp.start('css', 'sprite', 'images', 'js');
});

gulp.task('default', function() {
    gulp.start('server', 'watch');
});
