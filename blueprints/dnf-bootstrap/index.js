/*jshint node:true*/
var RSVP = require('rsvp');
var EOL = require('os').EOL;
var fs = require('fs');
var path = require('path');
module.exports = {
  description: '',

  afterInstall: function(options) {
    return this.insertIntoFile('ember-cli-build.js', `
   app.import(\'vendor/bootstrap.min.js\');
   app.import(\'vendor/bootstrap.min.css\');
   app.import(\'vendor/theme.min.css\');
   `, {
      before: 'return'
    }).then(() => {
      //return this.insertIntoFile('ember-cli-build.js', 'app.import(\'vendor/bootstrap.min.css\');', {
      //before: 'return'
      //}).then(() => {
      //return this.insertIntoFile('ember-cli-build.js', 'app.import(\'vendor/theme.min.css\');', {
      //before: 'return'
      //});
      //});
    });
  },

  afterUninstall: function(options) {
    var remove = [{
      file_path: '/ember-cli-build.js',
      remove_text: 'app.import(\'vendor/bootstrap.min.js\');\n'
    }, {
      file_path: '/ember-cli-build.js',
      remove_text: 'app.import(\'vendor/bootstrap.min.css\');\n'
    }, {
      file_path: '/ember-cli-build.js',
      remove_text: 'app.import(\'vendor/theme.min.css\');\n'
    }];

    remove.forEach((item, index) => {
      this.removeText(options, item);
    });
  },

  //thanks to: https://github.com/littleknot/LKFADDON/blob/9d2b6281958f9f624df9bc9dbbd95079be521f4a/lib/helper.js
  removeText: function(options, config) {
    file_path = options.project.root + config.file_path;
    source = fs.readFileSync(file_path, 'utf-8');
    new_text = source.replace(config.remove_text, '');
    fs.writeFileSync(file_path, new_text);
  },
  //injectText: function(options, config) {
    //file_path = options.project.root + config.file_path;
    //source = fs.readFileSync(file_path, 'utf-8');
    //pattern = new RegExp(options.entity.name);
    //is_name_exist = pattern.test(source);
    //new_text = source.replace(config.old_text, config.new_text);
    //if (!is_name_exist) {
      //fs.writeFileSync(file_path, new_text);
    //}
  //},
};

