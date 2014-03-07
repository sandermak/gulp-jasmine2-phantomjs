gulp-jasmine2-phantomjs
=======================

Use this plugin to run HTML spec files with Jasmine 2.0 specs. Currently, you must use this plugin in conjuction with the JUnitXmlReporter in [jasmine2-junit](https://github.com/sandermak/jasmine2-junit). This reporter generates JUnit XML reports to be used in a CI build. 

The plugin shows success/failure counts on the console. Specs will be run using PhantomJS.

Usage
-----
In order to setup gulp-jasmine2-phantomjs, require the plugin and use ```gulp.src``` to pipe html spec files (see readme of https://github.com/sandermak/jasmine2-junit for a correct setup of html files) into it:

```
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var specFiles = '**/*.html';

gulp.task('test', function() {
    return gulp.src(specFiles).pipe(jasminePhantomJs());
});
```

