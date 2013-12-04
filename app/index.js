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
    name: 'projectName',
    message: 'What is the name of the project?'
  },
  {
    name: 'projectUrl',
    message: 'What is the live URL?'
  },
  {
    name: 'themeName',
    message: 'What would you like to name the theme directory?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectUrl = props.projectUrl;
    this.themeName = props.themeName;
    this.installCSS = props.installCSS;

    cb();
  }.bind(this));
};

LoadedWpThemeGenerator.prototype.app = function app() {
  var cb   = this.async(), self = this;

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Copying starter files.'));

  this.mkdir(this.themeName);
  this.mkdir(this.themeName+'/assets/images/');
  this.mkdir(this.themeName+'/assets/images/sprites/');
  this.mkdir(this.themeName+'/assets/stylesheets/sass/');
  this.mkdir(this.themeName+'/assets/stylesheets/css/');
  this.mkdir(this.themeName+'/assets/javascripts/');
  this.mkdir(this.themeName+'/assets/vendor/');


  this.copy('404.php', this.themeName+'/404.php');
  this.copy('single.php', this.themeName+'/single.php');
  this.copy('footer.php', this.themeName+'/footer.php');
  this.copy('front-page.php', this.themeName+'/front-page.php');
  this.copy('functions.php', this.themeName+'/functions.php');
  this.copy('index.php', this.themeName+'/index.php');
  this.copy('page.php', this.themeName+'/page.php');

  this.copy('javascripts/presentation.js', this.themeName+'/assets/javascripts/presentation.js');

  this.copy('stylesheets/sass/_components.scss', this.themeName+'/assets/stylesheets/sass/_components.scss');
  this.copy('stylesheets/sass/_grid-settings.scss', this.themeName+'/assets/stylesheets/sass/_grid-settings.scss');
  this.copy('stylesheets/sass/_reset.scss', this.themeName+'/assets/stylesheets/sass/_reset.scss');
  this.copy('stylesheets/sass/_text.scss', this.themeName+'/assets/stylesheets/sass/_text.scss');
  this.copy('stylesheets/sass/_variables.scss', this.themeName+'/assets/stylesheets/sass/_variables.scss');
  this.copy('stylesheets/sass/style.scss', this.themeName+'/assets/stylesheets/sass/'+this.themeName+'.scss');

  this.template('_style.css', this.themeName+'/style.css');
  this.template('_header.php', this.themeName+'/header.php');

  this.log.info("Files copied!");

  cb();
};

LoadedWpThemeGenerator.prototype.installBourbon = function installBourbon() {
  var cb   = this.async(), self = this;

  this.log.writeln(chalk.cyan('=> ') + chalk.white("Installing Bourbon"));

  var child = exec('bourbon install --path '+this.themeName+'/assets/stylesheets/sass/',
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

    var child = exec('cd '+this.themeName+'/assets/stylesheets/sass/ && neat install',
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
  this.log(chalk.bold("Local:")+"       "+chalk.underline("http://localhost/" + this.themeName));
  this.log(chalk.bold("Projects:")+"    "+chalk.underline("http://projects.loadedcommunications.com.au/" + this.themeName));
};




