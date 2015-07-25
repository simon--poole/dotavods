//Include gulp
var gulp = require('gulp');

//Include plugins
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var cssbeautify = require('gulp-cssbeautify');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var sprityless = require('sprity-less');

//Default task - watches
gulp.task('default', ['build']);

//Build umbrella task
gulp.task('build', ['minify-css']);

gulp.task('clean', function(){
	return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('sprites', function (cb) {
  return sprity.src({
    src: './teams/*.png',
    style: './less/team-sprites.less',
    name: 'teams',
    processor: 'less',
	margin: 0,
  })
  .pipe(gulpif('*.png', gulp.dest('./images/'), gulp.dest('./less/')))
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
