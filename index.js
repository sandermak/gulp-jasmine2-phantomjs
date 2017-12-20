'use strict';

var path = require('path');
var childProcess = require('child_process');
var gutil = require('gulp-util');
var through = require('through2');
var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

module.exports = function(phantomArgs){
    return through.obj(function (file, enc, cb) {
        var filepath = file.path
        var isWindows = /^win/.test(process.platform);

        // Horrible workaround since Windows-style paths ('c:\foo\bar') seem to break PhantomJS
        if(isWindows) {
           var mangledpath = file.path.split(path.sep)
           mangledpath[0] = ''
           filepath = mangledpath.join('/')
        }

        var childArgs = [
            path.join(__dirname, 'jasmine2-runner.js'),
            filepath
        ];

        if(phantomArgs) {
            if(typeof phantomArgs === 'string') {
                childArgs.unshift(phantomArgs)
            } else if(Object.prototype.toString.call(phantomArgs) == '[object Array]') {
                phantomArgs.concat(childArgs)
            } else {
                this.emit('error', new gutil.PluginError('gulp-jasmine2-phantomjs', 'provided parameter must be string or an array of strings'));
            }
        }

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            gutil.log('Start running spec file: ', file.path)
            gutil.log('PhantomJS path: ', binPath);
            console.log(stdout);

            if (stderr !== '') {
                gutil.log('gulp-jasmine2-phantomjs: Failed to open test runner ' + gutil.colors.blue(file.relative));
                gutil.log(gutil.colors.red('error: '), stderr);
                this.emit('error', new gutil.PluginError('gulp-jasmine2-phantomjs', stderr));
            }

            if (err !== null) {
                gutil.log('gulp-jasmine2-phantomjs: ' + gutil.colors.red("\u2716 ") + 'Assertions failed in ' + gutil.colors.blue(file.relative));
                this.emit('error', new gutil.PluginError('gulp-jasmine2-phantomjs', err));
            }

            this.push(file);
            this.emit('end');

            return cb();
        }.bind(this));
    });
};
