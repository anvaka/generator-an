var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path');

var paths = {
  scripts: ['src/**/*.js'],
  markup: ['src/*.html'],
  styles: { paths: [ path.join(__dirname, 'src/styles') ] }
};

gulp.task('runBrowserify', runBrowserify);
gulp.task('compileLess', compileLess);
gulp.task('copyDist', copyDist);
gulp.task('watchChanges', watchChanges);
gulp.task('startStaticServer', startStaticServer);

gulp.task('build', ['runBrowserify', 'copyDist', 'compileLess']);
gulp.task('default', ['build', 'startStaticServer', 'watchChanges']);

function runBrowserify() {
  var fs = require('fs');

  require('browserify')()
    .add('./src/scripts/index.js')
    .bundle().pipe(fs.createWriteStream(path.join(__dirname + '/dist/bundle.js')));
}

function compileLess() {
  var less = require('gulp-less');
	gulp.src('src/styles/style.less')
		.pipe(less(paths.styles))
		.pipe(gulp.dest('dist/styles'));
}

function copyDist() {
  var concat = require('gulp-concat');

  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

  gulp.src('./node_modules/angular/lib/angular.min.js')
      .pipe(concat('external.min.js'))
      .pipe(gulp.dest('./dist'));
}

function watchChanges() {
  gulp.watch(paths.scripts, ['runBrowserify']);
  gulp.watch(paths.markup, ['copyDist']);
  gulp.watch('src/styles/*.less', ['compileLess']);
}

function startStaticServer() {
  var staticS = require('node-static'),
      server = new staticS.Server('./dist'),
      port = 31337;

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(port, function (err) {
    gutil.log("opened server on http://127.0.0.1:" + port);
  });
}
