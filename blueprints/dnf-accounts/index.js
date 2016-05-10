/*jshint node:true*/
var cli = require("ember-cli/lib/cli/index");
var path = require('path');

module.exports = {
  description: 'Add accounts to your app',

  fileMapTokens: function() {
    return {
      __pod__: function(options) {
        return path.join(options.podPath);
      },
    };
  },

  runCli(options, args) {
    if (!options.pod) {
      args.push('--pod');
    }
    if (options.dummy) {
      args.push('--dummy');
    }
    return cli({
      inputStream: this.ui.inputStream,
      outputStream: this.ui.outputStream,
      cliArgs: args
    });
  },

  beforeInstall(options) {
    return this.runCli(options, ['g', 'model', 'user', 'uid:string', 'email:string', 'firstName:string', 'lastName:string', 'provider:string', 'createdOn:number' ]).then(() => {
      return this.runCli(options, ['g', 'route', 'account']).then(() => {
        return this.runCli(options, ['g', 'route', 'account/resetpassword']).then(() => {
          return this.runCli(options, ['install', 'torii']).then(() => {

          });
        });
      });
    });
  },

  afterInstall(options) {
    var path = 'config/environment.js';
    if (options.dummy) {
      path = 'tests/dummy/' + path;
    }
    return this.insertIntoFile(path,
      `
      torii: {sessionServiceName: 'session'},`, {
        after: 'var ENV = {'
      }).then(() => {});
  }
};

