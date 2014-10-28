/* global require, console */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    app = 'app';

gulp.task('server', function(next) {
	var connect = require('connect'),
	    servestatic = require('serve-static'),
	    server = connect();

	server.use(require('connect-livereload')({
		port: 35729
	}));
	server.use(servestatic(app));
	server.listen(process.env.PORT || 80, next);
});

gulp.task('watch', ['server'], function() {
	var server = $.livereload();

	gulp.watch(app + '/**').on('change', function(file) {
		server.changed(file.path);
	});
});
