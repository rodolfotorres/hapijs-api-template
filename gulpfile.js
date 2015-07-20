/// <reference path="typings/node/node.d.ts"/>
'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './src/**/*.js'],
  watch: ['./gulpfile.js', './src/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  e2e: ['./e2e/**/*.js']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('unitTest', function () {
  return gulp.src(paths.tests, {cwd: __dirname})
    .pipe(plugins.plumber({}))
    .pipe(plugins.mocha());
});

gulp.task('default', ['test'], function () {
  return gulp.watch(paths.watch, ['test']);
});

gulp.task('e2e', function () {
  return gulp.src(paths.e2e, {cwd: __dirname})
    .pipe(plugins.plumber({}))
    .pipe(plugins.mocha());
});

gulp.task('test', ['lint', 'unitTest']);
