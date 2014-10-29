/* global require, process, console */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    template = 'template',
    app = 'app';

gulp.task('template', function() {
	gulp.src('./' + template + '/index.jade')
	.pipe($.jade())
	.on('error', function(error) {
		console.log(error);
		this.end();
	})
	.pipe(gulp.dest('./' + app + '/'));
});

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

	gulp.watch([template + '/**'], [template]);
	gulp.watch(app + '/**').on('change', function(file) {
		server.changed(file.path);
	});
});
