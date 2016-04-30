/*jshint node:true*/
module.exports = {
  description: 'Add a favicon to your application',

  afterInstall: function(options) {
    return this.insertIntoFile('app/index.html',
      `
    <link rel="icon" href="/assets/favicon.ico">
    `, {
        before: '<title>'
      }).then(() => {});
  },
};

