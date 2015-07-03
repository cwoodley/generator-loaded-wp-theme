'use strict';
var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  https = require('https'),
  fs = require('fs'),
  EventEmitter = require('events').EventEmitter;
  var exec = require('child_process').exec;
  var chalk   = require('chalk');

var LoadedWpThemeGenerator = module.exports = function LoadedWpThemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    // this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LoadedWpThemeGenerator, yeoman.generators.Base);

LoadedWpThemeGenerator.prototype.initGenerator = function () {
  this.log([
chalk.yellow('      :::        ::::::::       :::      :::::::::   ::::::::::  :::::::::'),
chalk.yellow('     :+:       :+:    :+:    :+: :+:    :+:    :+:  :+:         :+:    :+:'),
chalk.yellow('    +:+       +:+    +:+   +:+   +:+   +:+    +:+  +:+         +:+    +:+'),
chalk.yellow('   +#+       +#+    +:+  +#++:++#++:  +#+    +:+  +#++:++#    +#+    +:+'),
chalk.yellow('  +#+       +#+    +#+  +#+     +#+  +#+    +#+  +#+         +#+    +#+'),
chalk.yellow(' #+#       #+#    #+#  #+#     #+#  #+#    #+#  #+#         #+#    #+#'),
chalk.yellow('########## ########   ###     ###  #########   ##########  ######### ')
  ].join('\n'));

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Intializing WordPress Theme Generator v'+this.pkg.version));
};

LoadedWpThemeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // Validate required
  var requiredValidate = function(value) {
    if (value == '') {
      return 'This field is required.';
    }
    return true;
  };

  var prompts = [
  {
    name: 'themeName',
    message: 'What is the name of the theme?'
  },{
    type: 'confirm',
    name: 'addPhpFiles',
    message: 'Would you like to install template PHP files?',
    default: true
  },{
    name: 'liveUrl',
    message: 'What is the live site url? (excl. http://)'
  }];

  this.prompt(prompts, function (props) {
    this.themeName = props.themeName;
    this.addPhpFiles = props.addPhpFiles;
    this.liveUrl = props.liveUrl;
    cb();
  }.bind(this));
};

LoadedWpThemeGenerator.prototype.app = function app() {
  var cb   = this.async(), self = this;

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Copying starter files.'));

  var context = { 
    themeslug: this.themeName,
    url: this.liveUrl
  };
 
  // this.mkdir(this.themeName);
  this.mkdir('./assets/images/');
  this.mkdir('./assets/images/sprites/');
  this.mkdir('./assets/stylesheets/sass/');
  this.mkdir('./assets/stylesheets/css/');
  this.mkdir('./assets/javascripts/');
  this.mkdir('./assets/vendor/');

  if (this.addPhpFiles) {
    this.template('404.php', './404.php', context);
    this.template('archive.php', './archive.php', context);
    this.template('footer.php', './footer.php', context);
    this.template('functions.php', './functions.php', context);
    this.template('header.php', './header.php', context);
    this.template('index.php', './index.php', context);
    this.template('page.php', './page.php', context);
    this.template('readme.txt', './readme.txt', context);
    this.template('search.php', './search.php', context);
    this.template('single.php', './single.php', context);
    this.template('style.css', './style.css', context);
  }

  this.copy('javascripts/presentation.js', './assets/javascripts/presentation.js');

  this.copy('stylesheets/sass/_components.scss', './assets/stylesheets/sass/_components.scss');
  this.copy('stylesheets/sass/_grid-settings.scss', './assets/stylesheets/sass/_grid-settings.scss');
  this.copy('stylesheets/sass/_reset.scss', './assets/stylesheets/sass/_reset.scss');
  this.copy('stylesheets/sass/_utilities.scss', './assets/stylesheets/sass/_utilities.scss');
  this.copy('stylesheets/sass/_variables.scss', './assets/stylesheets/sass/_variables.scss');
  this.copy('stylesheets/sass/style.scss', './assets/stylesheets/sass/'+this.themeName+'.scss');

  cb();
};

LoadedWpThemeGenerator.prototype.installBourbon = function installBourbon() {
  var cb   = this.async(), self = this;

  this.log.writeln(chalk.cyan('=> ') + chalk.white("Installing Bourbon"));

  var child = exec('bourbon install --path ./assets/stylesheets/sass/',
    function (error, stdout, stderr) {
      if (error) {
        self.log.writeln(chalk.red('=> Installation Error!'));
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      } else {
        self.log.ok("Bourbon installed");
        cb();
      }
    });
}

LoadedWpThemeGenerator.prototype.installNeat = function installNeat() {
  var cb   = this.async(), self = this;

  this.log.writeln(chalk.cyan('=> ') + chalk.white("Installing Neat"));

    var child = exec('cd ./assets/stylesheets/sass/ && neat install',
    function (error, stdout, stderr) {
      if (error) {
        self.log.writeln(chalk.red('=> Installation Error!'));
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      } else {
        self.log.ok("Neat installed");
        cb();
      }
    });
};

LoadedWpThemeGenerator.prototype.donezo = function donezo() {
  this.log(chalk.bold.green('\n------------------------\n\n\nAll Done!!\n'), {logPrefix: ''});
};




