/*jshint node:true*/
var fs = require('fs-extra');
var cli = require("ember-cli/lib/cli/index");

module.exports = {
  description: 'Add emberfire to an ember app',

  locals(options) {
    return {
      firebaseUrl: options.entity.name
    };
  },

  beforeInstall(options) {
    var cliArgs = ['install', 'emberfire'];
    if (options.dummy) {
      cliArgs.push('--dummy');
    }
    var env = {
      inputStream: this.ui.inputStream,
      outputStream: this.ui.outputStream,
      cliArgs: cliArgs
    };
    return cli(env).then((r) => {});
  },

  afterInstall(options) {
    var firebaseUrl = options.entity.name;

    var str = 'YOUR-FIREBASE-NAME';
    var envPath = 'config/environment.js';
    var fileContent = fs.readFileSync(envPath, 'utf-8');
    var changedFileContent = fileContent.replace(str, firebaseUrl);

    fs.writeFileSync(envPath, changedFileContent);
  }
};

