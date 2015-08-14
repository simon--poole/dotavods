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
var lwip = require('gulp-lwip');
var gutil = require('gulp-util');

//Default task - watches
gulp.task('default', ['build']);

//Build umbrella task
gulp.task('build', ['minify-css']);

gulp.task('clean', function(){
	return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('clean-team-icons', function(){
	return gulp.src('./teams/dist')
        .pipe(clean());
});
gulp.task('resize-team-icons', ['clean-team-icons'], function(){
	return gulp.src(["./teams/**/*.png", "!./teams/dist/*.png"])
		.pipe(lwip
			.resize(48, 20)
			.exportAs("png")
		)
		.pipe(gulp.dest("./teams/dist"));
});

gulp.task('generate-team-icons', ['resize-team-icons'], function () {
  return sprity.src({
    src: './teams/dist/**/*.png',
    style: './less/team-sprites.less',
    name: 'teams',
    processor: 'less',
	margin: 0,
  })
   .on('error', gutil.log)
  .pipe(gulpif('*.png', gulp.dest('./images/'), gulp.dest('./less/')))
});

gulp.task('generate-thumbnails',function () {
  return sprity.src({
    src: './thumbs/**',
    style: './less/thumb-sprites.less',
    name: 'thumbnails',
    processor: 'less',
	margin: 0,
  })
   .on('error', gutil.log)
  .pipe(gulpif('*.png', gulp.dest('./images/'), gulp.dest('./less/')))
});

gulp.task('sprites', ['generate-team-icons', 'generate-thumbnails']);

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
