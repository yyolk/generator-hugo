'use strict';

// Required things for this to work
var gulp = require('gulp');
var bump = require('gulp-bump');
var changelog = require('conventional-changelog');
var fs = require('fs');

// Automatically update the changelog from verison to version
gulp.task('changelog', function(callback) {
	changelog({
		version: require('./package.json').version,
		repository: 'https://github.com/sondr3/testest'
	}, function(err, log) {
		if (err) throw new Error(err);
		fs.writeFileSync('CHANGELOG.md', log);
	});
});

// Increments the version by a patched version (major.minor.PATCH)
gulp.task('patch', function() {
	gulp.src('./package.json')
	  .pipe(bump({ type: 'patch' }))
	  .pipe(gulp.dest('./'));
});

// Increments the version by a minor version (major.MINOR.patch)
gulp.task('minor', function() {
	gulp.src('./package.json')
	  .pipe(bump({ type: 'minor' }))
	  .pipe(gulp.dest('./'));
});

// Increments the version by a major release (MAJOR.minor.patch)
gulp.task('major', function() {
	gulp.src('./package.json')
	  .pipe(bump({ type: 'major' }))
	  .pipe(gulp.dest('./'));
});
