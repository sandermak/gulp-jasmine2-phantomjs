gulp-jasmine2-phantomjs
=======================

Use this plugin to run HTML spec files with Jasmine 2.0 specs. The plugin shows success/failure counts on the console. Specs will be run using PhantomJS.

Usage
-----
In order to setup gulp-jasmine2-phantomjs, require the plugin and use ```gulp.src``` to pipe spec files into it:

```
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var specFiles = '**/*.html';

gulp.task('test', function() {
    return gulp.src(specFiles).pipe(jasminePhantomJs());
});
```

You can use this plugin in conjuction with [jasmine2-junit](https://github.com/sandermak/jasmine2-junit) to generate JUnit XML reports in a CI build.