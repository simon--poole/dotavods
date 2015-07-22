//Include gulp
var gulp = require('gulp');

//Include plugins
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var cssbeautify = require('gulp-cssbeautify');

//Default task - watches
gulp.task('default', ['watch']);

//Build umbrella task
gulp.task('build', ['minify-css']);

gulp.task('clean', function(){
	return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('less-build', ['clean'], function() {
    return gulp.src('less/dotavods.less')
        .pipe(less())
		.pipe(cssbeautify({
            indent: '	',
            openbrace: 'separate-line',
            autosemicolon: true
        }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('minify-css', ['less-build'], function(){
	return gulp.src('dist/dotavods.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/'));
});

//Watcher task, monitors angular/node code to restart app and redeploy
gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build']);
});