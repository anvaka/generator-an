var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path');

var devServer = {
  port: 31337,
  livereload: 35729,
  root: './dist'
};

var paths = {
  scripts: ['src/**/*.js'],
  markup: ['src/*.html'],
  styles: { paths: [ path.join(__dirname, 'src/styles') ] }
};

gulp.task('runBrowserify', runBrowserify);
gulp.task('compileLess', compileLess);
gulp.task('makeDist', makeDist);
gulp.task('copyDist', copyDist);
gulp.task('watchChanges', watchChanges);
gulp.task('startStaticServer', startStaticServer);

gulp.task('build', ['makeDist', 'runBrowserify', 'copyDist', 'compileLess']);
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

function makeDist() {
  var fs = require('fs');
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }
}

function copyDist() {
  var concat = require('gulp-concat');

  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

  gulp.src('./node_modules/angular/lib/angular.min.js')
      .pipe(concat('external.min.js'))
      .pipe(gulp.dest('./dist'));

  gulp.src('./node_modules/twitter-bootstrap-3.0.0/fonts/*')
      .pipe(gulp.dest('./dist/fonts/'));
}

function watchChanges() {
  gulp.watch(paths.scripts, ['runBrowserify']);
  gulp.watch('src/styles/*.less', ['compileLess']);
  gulp.watch(paths.markup, ['copyDist']);
  gulp.watch('dist/**').on('change', notifyLivereload);
}

var lr;
function startStaticServer() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(devServer.root));
  app.listen(devServer.port, function () {
    gutil.log("opened server on http://127.0.0.1:" + devServer.port);
  });

  lr = require('tiny-lr')();
  lr.listen(devServer.livereload);
}

function notifyLivereload(event) {
  var fileName = require('path').relative(devServer.root, event.path);
  lr.changed({ body: { files: [fileName] } });
}
