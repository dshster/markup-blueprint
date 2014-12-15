/* global require, process, console */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    path = require('path'),
    paths = require('./preferences.json');

var styles = function(minify) {
	return gulp.src(paths.styles + '/index.less')
             .pipe($.less({
                 cleancss: minify
             }))
             .on('error', function(error) {
                 console.log(error);
                 this.end();
             })
             .pipe($.autoprefixer(['last 3 versions', 'ie 9', 'ie 10', 'opera 12']))
             .pipe($.rename('index.css'))
             .pipe(gulp.dest(paths.compile));
};

var template = function() {
	return gulp.src('./' + paths.template + '/index.jade')
	           .pipe($.data(function(file) {
	               return require('./' + paths.data + '/' + path.basename(file.path) + '.json');
	           }))
	           .pipe($.jade())
	           .on('error', function(error) {
		             console.log(error);
		             this.end();
	           })
	           .pipe(gulp.dest('./' + paths.app + '/'));
};

gulp.task('server', function(next) {
	var connect = require('connect'),
	    servestatic = require('serve-static'),
	    server = connect();

	server.use(require('connect-livereload')({
		port: 35729
	}));
	server.use(servestatic(paths.app));
	server.listen(process.env.PORT || 3000, next);
});

gulp.task('watch', ['server'], function() {
	var server = $.livereload();

	gulp.watch([paths.template + '/*.jade'], function(event) {
		console.log('Template ' + event.path + ' was ' + event.type);
		return template();
	});

	gulp.watch([paths.styles + '/*', paths.styles + '/**'], function(event) {
		console.log('Style ' + event.path + ' was ' + event.type);
		return styles(false);
	});

	gulp.watch([paths.app + '/**', paths.compile + '/*']).on('change', function(file) {
		server.changed(file.path);
	});
});

gulp.task('default', function() {
	template();
	return styles(true);
});
