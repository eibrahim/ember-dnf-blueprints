/*jshint node:true*/
module.exports = {
  description: 'Add Google analytics to your ember app',

  beforeInstall: function(options) {},

  normalizeEntityName: function(entityName) {
    if (!entityName) {
      throw "Missing tracking Id.  Try running `ember generate dnf-google-analytics UA-YOUR-ID`"
    }
    return entityName;
  },

  afterInstall: function(options) {
    var gaId = options.entity.name;
    return this.insertIntoFile('app/index.html',
      `<script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

       ga('create', '${gaId}', 'auto');
       ga('send', 'pageview');

     </script>`, {
        before: '</body>'
      }).then(() => {
      return this.insertIntoFile('app/router.js',
        `
Router.reopen({
  notifyGoogleAnalytics: function() {
    console.log('sending to GA ' + this.get('url'));
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});
        `,
        {
          before: 'export'
        }).then(() => {});

    });
  }
};

