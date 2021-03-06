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

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Intialising WordPress Theme Generator v'+this.pkg.version));
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
    message: 'What is the name of the theme?',
    required: true
  },{
    name: 'liveUrl',
    message: 'What is the live site url? (excl. http://)'
  },{
    type: 'confirm',
    name: 'installBourbon',
    message: 'Install Bourbon? (default: yes)',
    default: true,
  },{
    type: 'confirm',
    name: 'installNeat',
    message: 'Install Neat? (default: no)',
    default: false,
  },{
    type: 'confirm',
    name: 'createGit',
    message: 'Would you like to initialise this as a git repository? (default: yes)',
    default: true
  }];

  this.prompt(prompts, function (props) {

    this.themeName = props.themeName;
    this.liveUrl = props.liveUrl;
    this.createGit = props.createGit;
    this.installBourbon = props.installBourbon;
    this.installNeat = props.installNeat;

    cb();
  }.bind(this));
};

LoadedWpThemeGenerator.prototype.app = function app() {
  var cb   = this.async(), self = this;

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Copying starter files.'));

  var context = { 
    themeslug: this.themeName,
    installBourbon: this.installBourbon,
    installNeat: this.installNeat,    
    url: this.liveUrl
  };
 
  // this.mkdir(this.themeName);
  this.mkdir('./assets/images/');
  this.mkdir('./assets/images/sprites/');
  this.mkdir('./assets/stylesheets/sass/');
  this.mkdir('./assets/stylesheets/css/');
  this.mkdir('./assets/javascripts/');
  this.mkdir('./assets/vendor/');

  // default theme files
  this.template('404.php', './404.php', context);
  this.template('archive.php', './archive.php', context);
  this.template('footer.php', './footer.php', context);
  this.template('front-page.php', './front-page.php', context);
  this.template('functions.php', './functions.php', context);
  this.template('header.php', './header.php', context);
  this.template('index.php', './index.php', context);
  this.template('page.php', './page.php', context);
  this.template('readme.txt', './readme.txt', context);
  this.template('search.php', './search.php', context);
  this.template('single.php', './single.php', context);
  this.template('style.css', './style.css', context);

  this.copy('javascripts/presentation.js', './assets/javascripts/presentation.js');

  this.copy('stylesheets/sass/_burger.scss', './assets/stylesheets/sass/_burger.scss');
  this.copy('stylesheets/sass/_forms.scss', './assets/stylesheets/sass/_forms.scss');
  if (this.installNeat) {
    this.copy('stylesheets/sass/_grid-settings.scss', './assets/stylesheets/sass/_grid-settings.scss');
  }
  this.copy('stylesheets/sass/_include-media.scss', './assets/stylesheets/sass/_include-media.scss');
  this.template('stylesheets/sass/_modules.scss', './assets/stylesheets/sass/_modules.scss', context);
  this.copy('stylesheets/sass/_nav.scss', './assets/stylesheets/sass/_nav.scss');
  this.copy('stylesheets/sass/_reset.scss', './assets/stylesheets/sass/_reset.scss');
  this.template('stylesheets/sass/_utilities.scss', './assets/stylesheets/sass/_utilities.scss', context);
  this.copy('stylesheets/sass/_variables.scss', './assets/stylesheets/sass/_variables.scss');
  this.template('stylesheets/sass/style.scss', './assets/stylesheets/sass/'+this.themeName+'.scss', context);

  if (this.createGit) {
    this.copy('.gitignore', './.gitignore');
  }

  cb();
};

LoadedWpThemeGenerator.prototype.bourbon = function bourbon() {
  var cb   = this.async(), self = this;

  if (this.installBourbon) {
    
    self.log.writeln(chalk.cyan('=> ') + chalk.white("Installing Bourbon"));

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
  } else {
    cb();
  }
}

LoadedWpThemeGenerator.prototype.neat = function neat() {
  var cb   = this.async(), self = this;

  if (this.installNeat) {

    self.log.writeln(chalk.cyan('=> ') + chalk.white("Installing Neat"));

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
  } else {
    cb();
  }
};

LoadedWpThemeGenerator.prototype.git = function git() {
var cb   = this.async(), self = this;

  if (this.createGit) {
    this.log.writeln(chalk.cyan('=> ') + chalk.white('Initialising Git repository.'));
    exec('git init && git add . && git commit -am "initial commit"', function (error, stdout, stderr) {
      if (error) {
        self.log.writeln(chalk.red('=> Git Initialisation Error!'));
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      } else {
        self.log.ok("Git repo initialised.");
        cb();
      }
    });
  } else {
    cb();
  }
}

LoadedWpThemeGenerator.prototype.donezo = function donezo() {
  this.log(chalk.bold.green('\n------------------------\n\nAll Done!!\n'), {logPrefix: ''});
};