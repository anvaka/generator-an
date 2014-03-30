var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var BroGenerator = module.exports = function BroGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  this.greeting = require('./lib/quotes')();
  this.on('end', printInstructions);
};

util.inherits(BroGenerator, yeoman.generators.Base);

BroGenerator.prototype.buildFilesFromPackage = function () {
  this.copy('_.gitignore', '.gitignore');
  this.copy('_.travis.yml', '.travis.yml');
  this.copy('_gulpfile.js', 'gulpfile.js');
  this.template('_.zuul.yml', '.zuul.yml');
  this.template('_LICENSE', 'LICENSE');
  this.template('_package.json', 'package.json');
  this.directory('test', 'test');
  this.directory('src', 'src');
  this.mkdir('dist');
  this.mkdir('dist/styles');
};

function printInstructions() {
  console.log('Please run ' + chalk.yellow.bold('npm install') + ' to install all dependencies');
}
